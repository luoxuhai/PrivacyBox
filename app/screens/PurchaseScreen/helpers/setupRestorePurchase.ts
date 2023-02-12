import { InAppPurchase } from './InAppPurchase';

export async function setupRestorePurchase() {
  await InAppPurchase.shared.connection();
  await InAppPurchase.shared.restorePurchase();
}
