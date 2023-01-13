import { rootStore } from '@/models';
import { RootNavigation } from '@/navigators';

export function canUsePremium() {
  if (rootStore.purchaseStore.isPurchased) {
    return true;
  } else {
    RootNavigation.navigate('Purchase');
    return false;
  }
}
