import { InAppPurchase } from './InAppPurchase';

export async function setupInAppPurchase() {
  await InAppPurchase.shared.connection();
  // InAppPurchase.shared.initPromotedProduct();
  InAppPurchase.shared.restorePurchase();
}
