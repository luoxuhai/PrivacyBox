import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native';
import {
  purchaseUpdatedListener,
  requestPurchase,
  initConnection,
  endConnection,
  finishTransaction,
  getAvailablePurchases,
  getProducts,
  SubscriptionPurchase,
  ProductPurchase,
  purchaseErrorListener,
  PurchaseError,
  getPromotedProductIOS,
  buyPromotedProductIOS,
  PROMOTED_PRODUCT,
} from 'react-native-iap';
import { rootStore } from '@/models';
import { Overlay, reportException } from '@/utils';
import { translate } from '@/i18n';
import { request } from '@/utils/request/request';
import Config from '@/config';

const { RNIapIos } = NativeModules;
const RNIapEmitter = new NativeEventEmitter(RNIapIos);

/**
 * 内购辅助类
 */
export class InAppPurchase {
  static shared = new InAppPurchase();

  private purchaseUpdateSubscription?: EmitterSubscription;
  private purchaseErrorSubscription?: EmitterSubscription;

  public isInitialized = false;
  private productId = Config.productId;

  public async connection() {
    if (this.isInitialized) {
      return;
    }

    try {
      await initConnection();
    } catch (error) {
      reportException({ error, message: '连接内购失败', level: 'fatal' });
      throw error;
    }

    this.isInitialized = true;
  }

  public async init(
    productId: string,
    onPurchaseSuccess?: (purchase: SubscriptionPurchase | ProductPurchase) => void,
    onPurchaseError?: (error: PurchaseError) => void,
  ) {
    await this.connection();
    this.productId = productId;
    this.removeAllListener();
    this.addPurchaseUpdatedListener(onPurchaseSuccess);
    this.addPurchaseErrorListener(onPurchaseError);
  }

  public async destroy() {
    this.removeAllListener();
    const end = await endConnection();
    this.isInitialized = false;
    return end;
  }

  public removeAllListener() {
    this.purchaseUpdateSubscription?.remove();
    this.purchaseErrorSubscription?.remove();
    this.purchaseUpdateSubscription = null;
    this.purchaseErrorSubscription = null;
  }

  /**
   * 获取产品信息
   * @returns
   */
  public async getProduct() {
    try {
      return (await getProducts({ skus: [this.productId] }))[0];
    } catch (error) {
      reportException({ error, message: '获取产品价格信息失败', level: 'fatal' });
      throw error;
    }
  }

  /**
   * 发起付款
   */
  public async requestPurchase() {
    try {
      return await requestPurchase({
        sku: this.productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (error) {
      reportException({ error, message: '点击发起购买', level: 'fatal' });
      throw error;
    }
  }

  public async restorePurchase() {
    const result = (await getAvailablePurchases()).find(
      (purchase) => purchase.productId === this.productId,
    );

    const isPurchased = !!result.transactionReceipt;
    if (result.transactionReceipt) {
      this.setPurchasedState(true, result.transactionReceipt);
    } else {
      this.setPurchasedState(false);
    }

    return isPurchased;
  }

  public setPurchasedState(isPurchased: boolean, receipt?: string) {
    rootStore.purchaseStore.setIsPurchased(isPurchased, receipt);
  }

  public getPurchasedState() {
    return rootStore.purchaseStore.isPurchased;
  }

  /**
   * 初始化推广产品
   */
  public initPromotedProduct() {
    RNIapEmitter.addListener(PROMOTED_PRODUCT, async () => {
      const product = await getPromotedProductIOS();
      if (product.productId === this.productId) {
        this.removeAllListener();
        this.addPurchaseUpdatedListener();
        this.addPurchaseErrorListener();

        try {
          await buyPromotedProductIOS();
        } catch (error) {
          console.warn(error);
        }
      }
    });
  }

  private addPurchaseUpdatedListener(
    handler?: (purchase: SubscriptionPurchase | ProductPurchase) => void,
  ) {
    if (!this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: SubscriptionPurchase | ProductPurchase) => {
          if (this.getPurchasedState() || purchase.productId !== this.productId) {
            return;
          }

          try {
            await finishTransaction({ purchase, isConsumable: false });
            this.setPurchasedState(true, purchase.transactionReceipt);
            Overlay.alert({ preset: 'done', title: translate('purchaseScreen.purchaseSuccess') });
            handler?.(purchase);
            request.post('/api/v1/purchase/notification', { app: '隐私盒子', price: 12 * 0.85 });
          } catch (error) {
            this.purchaseErrorHandler(error);
          }
        },
      );
    }
  }

  /**
   * 购买失败
   */
  private addPurchaseErrorListener(handler?: (error: PurchaseError) => void) {
    if (!this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
        this.purchaseErrorHandler();
        handler?.(error);
      });
    }
  }

  public purchaseErrorHandler(error?: PurchaseError) {
    Overlay.alert({
      preset: 'error',
      title: translate('purchaseScreen.purchaseFail'),
      message: error?.message ?? '',
    });
    this.setPurchasedState(false);
    reportException({ error, message: '购买失败', level: 'fatal' });
  }
}
