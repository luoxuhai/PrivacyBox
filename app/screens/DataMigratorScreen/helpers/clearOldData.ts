import { exists, unlink } from 'react-native-fs';
import { DATA_PATH, OLD_DB_PATH } from '../constants';

export async function clearOldData() {
  if (await exists(DATA_PATH)) {
    await unlink(DATA_PATH);
  }
  if (await exists(OLD_DB_PATH)) {
    await unlink(OLD_DB_PATH);
  }
}
