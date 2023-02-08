import { rootStore } from '@/models';
import { InAppPurchase } from './InAppPurchase';

export async function setupRestorePurchase() {
  await InAppPurchase.shared.connection();
  const isPurchased = await InAppPurchase.shared.restorePurchase();

  if (isPurchased) {
    rootStore.purchaseStore.setIsPurchased(true);
  } else {
    rootStore.purchaseStore.setIsPurchased(false);
  }
}
