import { NativeModules } from 'react-native';

export async function setBlockedApplications(applications: string[]): Promise<void> {
  return await NativeModules.RNManagedSettings.setBlockedApplications(applications);
}

export async function getBlockedApplications(): Promise<string[]> {
  return await NativeModules.RNManagedSettings.getBlockedApplications();
}

export async function isApproved(): Promise<boolean> {
  const status = await NativeModules.RNManagedSettings.getAuthorizationStatus();
  return status === 2;
}
