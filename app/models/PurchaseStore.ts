import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

/**
 * Model description here for TypeScript hints.
 */
export const PurchaseStoreModel = types
  .model('PurchaseStore')
  .props({
    isPurchased: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setIsPurchased(isPurchased: boolean) {
      self.isPurchased = isPurchased;
    },
  }));

export interface PurchaseStore extends Instance<typeof PurchaseStoreModel> {}
export interface PurchaseStoreSnapshotOut extends SnapshotOut<typeof PurchaseStoreModel> {}
export interface PurchaseStoreSnapshotIn extends SnapshotIn<typeof PurchaseStoreModel> {}
export const createPurchaseStoreDefaultModel = () => types.optional(PurchaseStoreModel, {});
