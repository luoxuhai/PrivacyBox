import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

import { storage } from '@/utils/storage';

const RECEIPT_STORAGE_KEY = 'transaction-receipt';

export const PurchaseStoreModel = types
  .model('PurchaseStore')
  .props({
    isPurchased: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setIsPurchased(isPurchased: boolean, receipt?: string) {
      self.isPurchased = isPurchased;
      if (receipt) {
        storage.set(RECEIPT_STORAGE_KEY, receipt);
      }
    },

    clear() {
      self.isPurchased = false;
      storage.remove(RECEIPT_STORAGE_KEY);
    },
  }));

export interface PurchaseStore extends Instance<typeof PurchaseStoreModel> {}
export interface PurchaseStoreSnapshotOut extends SnapshotOut<typeof PurchaseStoreModel> {}
export interface PurchaseStoreSnapshotIn extends SnapshotIn<typeof PurchaseStoreModel> {}
export const createPurchaseStoreDefaultModel = () => types.optional(PurchaseStoreModel, {});
