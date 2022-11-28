import { AppLockStore } from '@/models';

export async function isAppLocked(lockState: AppLockStore) {
  const now = Date.now();

  if (now >= lockState.appInBackgroundTimestamp + lockState.autolockTimeout) {
    return true;
  } else {
    return false;
  }
}
