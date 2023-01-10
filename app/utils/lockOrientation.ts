import OrientationLocker from 'react-native-orientation-locker';

import { Device } from './device';

export function lockOrientation() {
  if (!Device.isPad) {
    OrientationLocker.lockToPortrait();
  }
}
