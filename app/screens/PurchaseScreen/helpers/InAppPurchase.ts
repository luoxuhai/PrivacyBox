import { EmitterSubscription } from 'react-native';
import {
  purchaseUpdatedListener,
  requestPurchase,
  initConnection,
  finishTransaction,
  getPurchaseHistory,
  getProducts,
  SubscriptionPurchase,
  ProductPurchase,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';

/**
 * 内购辅助类
 */
export class InAppPurchase {
  static shared = new InAppPurchase();

  private purchaseUpdateSubscription: EmitterSubscription;
  private purchaseErrorSubscription: EmitterSubscription;

  private onPurchaseUpdatedHandler: (purchase: SubscriptionPurchase | ProductPurchase) => void;
  private onPurchaseErrorHandler: (error: PurchaseError) => void;
  public isInitialized = false;

  public async init() {
    if (this.isInitialized) {
      return;
    }

    await initConnection();
    this.isInitialized = true;
    this.addPurchaseUpdatedListener(() => null);
    this.addPurchaseErrorListener(() => null);
  }

  /**
   * 获取产品信息
   * @param productId
   * @returns
   */
  public async getProduct(productId: string) {
    return (await getProducts({ skus: [productId] }))[0];
  }

  /**
   * 发起付款
   * @param productId
   */
  public async requestPurchase(productId: string) {
    try {
      await requestPurchase({
        sku: productId,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  /**
   * 恢复购买
   * @param productId
   * @returns
   */
  public async restorePurchase(productId: string) {
    const result = (await getPurchaseHistory())[0];
    return result.productId === productId;
  }

  public addPurchaseUpdatedListener(
    handler: (purchase: SubscriptionPurchase | ProductPurchase) => void,
  ) {
    if (handler) {
      this.onPurchaseUpdatedHandler = handler;
    }

    if (!this.purchaseUpdateSubscription && this.isInitialized) {
      this.purchaseUpdateSubscription = purchaseUpdatedListener(this.onPurchaseUpdatedHandler);
    }

    return () => {
      this.onPurchaseUpdatedHandler = null;
    };
  }

  public addPurchaseErrorListener(handler: (error: PurchaseError) => void) {
    if (handler) {
      this.onPurchaseErrorHandler = handler;
    }

    if (!this.purchaseErrorSubscription && this.isInitialized) {
      this.purchaseErrorSubscription = purchaseErrorListener(this.onPurchaseErrorHandler);
    }

    return () => {
      this.onPurchaseErrorHandler = null;
    };
  }
}
