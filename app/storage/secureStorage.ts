import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV({
  id: 'encryption',
  encryptionKey: 'xxx',
});

export function set(key: string, value: boolean | string | number | Uint8Array) {
  mmkv.set(key, value);
}

export function setObject(key: string, value: object) {
  mmkv.set(key, JSON.stringify(value));
}

export function get(key: string) {
  return mmkv.getString(key);
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
