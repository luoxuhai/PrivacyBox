import { exists } from 'react-native-fs';

import { OLD_DB_PATH } from '../constants';

export function existsOldData() {
  return exists(OLD_DB_PATH);
}
