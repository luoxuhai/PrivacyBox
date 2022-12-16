import { MMKV } from 'react-native-mmkv';

import { LocalPathManager } from '@/utils/LocalPathManager';

export const mmkv = new MMKV({
  id: 'default',
  path: `${LocalPathManager.basePath}/storage`,
});

export function set(key: string, value: boolean | string | number | Uint8Array | object) {
  mmkv.set(key, typeof value === 'object' ? JSON.stringify(value) : value);
}

export function setObject(key: string, value: object) {
  mmkv.set(key, JSON.stringify(value));
}

export function get(key: string, type: 'number' | 'string' | 'boolean' | 'object' = 'string') {
  switch (type) {
    case 'boolean':
      return mmkv.getBoolean(key);
    case 'number':
      return mmkv.getNumber(key);
    case 'object':
      return JSONParse(mmkv.getString(key));
    default:
      return mmkv.getString(key);
  }
}

export function remove(key: string) {
  mmkv.delete(key);
}

export function clear() {
  return mmkv.clearAll();
}

export function getAllKeys() {
  return mmkv.getAllKeys();
}

function JSONParse(data?: string) {
  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    if (__DEV__) {
      console.error('[JSONParse]', error);
    }
    return null;
  }
}
