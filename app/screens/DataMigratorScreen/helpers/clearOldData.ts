import { unlink } from 'react-native-fs';
import { DATA_PATH, OLD_DB_PATH } from '../constants';

export function clearOldData() {
  unlink(DATA_PATH);
  unlink(OLD_DB_PATH);
}
