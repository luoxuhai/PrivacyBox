import { Platform, PlatformIOSStatic } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo, { NetInfoWifiState } from '@react-native-community/netinfo';

export const Device = {
  os: Platform.OS,
  isPad: (Platform as PlatformIOSStatic).isPad,
  version: String(Platform.Version),
  modelName: DeviceInfo.getModel(),
  isEmulator: DeviceInfo.isEmulatorSync(),
  uniqueId: DeviceInfo.getUniqueIdSync(),
  getUsedMemory: async () => DeviceInfo.getUsedMemory(),
  getTotalMemory: async () => DeviceInfo.getTotalMemory(),
  getFreeDiskStorage: async () => DeviceInfo.getFreeDiskStorage(),
  getIpAddress: async () => ((await NetInfo.fetch()) as NetInfoWifiState)?.details?.ipAddress,
  getNetworkStateType: async () => (await NetInfo.fetch()).type,
};
