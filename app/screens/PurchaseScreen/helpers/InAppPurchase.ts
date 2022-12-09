import { EmitterSubscription } from 'react-native';
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
} from 'react-native-iap';
import { rootStore } from '@/models';
import { Overlay } from '@/utils';
import { translate } from '@/i18n';

/**
 * 内购辅助类
 */
export class InAppPurchase {
  static shared = new InAppPurchase();

  private purchaseUpdateSubscription?: EmitterSubscription;
  private purchaseErrorSubscription?: EmitterSubscription;

  public isInitialized = false;
  private productId: string;

  public async init(
    productId: string,
    onPurchaseSuccess?: (purchase: SubscriptionPurchase | ProductPurchase) => void,
    onPurchaseError?: (error: PurchaseError) => void,
  ) {
    console.log('[StartInitConnection]');
    if (this.isInitialized) {
      return;
    }

    await initConnection();
    this.productId = productId;
    this.addPurchaseUpdatedListener(onPurchaseSuccess);
    this.addPurchaseErrorListener(onPurchaseError);
    this.isInitialized = true;
    console.log('[InitConnection]');
  }

  public async destroy() {
    this.purchaseUpdateSubscription?.remove();
    this.purchaseErrorSubscription?.remove();
    this.purchaseUpdateSubscription = null;
    this.purchaseErrorSubscription = null;
    const end = await endConnection();
    this.isInitialized = false;
    return end;
  }

  /**
   * 获取产品信息
   * @returns
   */
  public async getProduct() {
    return (await getProducts({ skus: [this.productId] }))[0];
  }

  /**
   * 发起付款
   */
  public async requestPurchase() {
    console.log('productId', this.productId);
    try {
      await requestPurchase({
        sku: this.productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  /**
   * 购买成功
   * @returns
   */
  public async restorePurchase() {
    const result = (await getAvailablePurchases()).some(
      (purchase) => purchase.productId === this.productId,
    );
    return result;
  }

  public setPurchasedState(isPurchased: boolean) {
    rootStore.purchaseStore.setIsPurchased(isPurchased);
  }

  private addPurchaseUpdatedListener(
    handler?: (purchase: SubscriptionPurchase | ProductPurchase) => void,
  ) {
    if (!this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription = purchaseUpdatedListener(
        (purchase: SubscriptionPurchase | ProductPurchase) => {
          console.warn('[purchaseUpdate]', purchase);
          if (purchase.productId === this.productId) {
            finishTransaction({ purchase });
            this.setPurchasedState(true);
            Overlay.alert({ preset: 'done', title: translate('purchaseScreen.purchaseSuccess') });
            handler?.(purchase);
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
        console.warn('[purchaseError]', error);
        // if (error.code !== ErrorCode.E_ALREADY_OWNED) {
        Overlay.alert({
          preset: 'error',
          title: translate('purchaseScreen.purchaseFail'),
          message: error.message,
        });
        this.setPurchasedState(false);
        handler?.(error);
        // }
      });
    }
  }
}
