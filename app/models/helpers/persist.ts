/**
 * https://github.com/agilgur5/mst-persist/blob/master/src/index.ts
 */
import { onSnapshot, applySnapshot, IStateTreeNode } from 'mobx-state-tree';
import { storage } from '@/storage';

export interface IArgs {
  (name: string, store: IStateTreeNode, options?: IOptions): void;
}
export interface IOptions {
  readonly whitelist?: Array<string>;
  readonly blacklist?: Array<string>;
}
type StrToAnyMap = { [key: string]: any };

export const persist: IArgs = (name, store, options = {}) => {
  const { whitelist, blacklist } = options;

  const whitelistDict = arrToDict(whitelist);
  const blacklistDict = arrToDict(blacklist);

  onSnapshot(store, (_snapshot: StrToAnyMap) => {
    // need to shallow clone as otherwise properties are non-configurable (https://github.com/agilgur5/mst-persist/pull/21#discussion_r348105595)
    const snapshot = { ..._snapshot };
    Object.keys(snapshot).forEach((key) => {
      if (whitelist && !whitelistDict[key]) {
        delete snapshot[key];
      }
      if (blacklist && blacklistDict[key]) {
        delete snapshot[key];
      }
    });

    storage.set(name, snapshot);
  });

  const snapshot = storage.get(name, 'object');
  if (!snapshot) {
    return;
  }

  applySnapshot(store, snapshot);
};

type StrToBoolMap = { [key: string]: boolean };

function arrToDict(arr?: Array<string>): StrToBoolMap {
  if (!arr) {
    return {};
  }
  return arr.reduce((dict: StrToBoolMap, elem) => {
    dict[elem] = true;
    return dict;
  }, {});
}

export default persist;
