import { PermissionManager } from '@/utils';
import { launchImageLibrary, ImagePickerResponse } from '@react-native-library/photos-picker';

export async function openPhotosPicker(): Promise<ImagePickerResponse['assets'][0]> {
  if (!(await PermissionManager.checkPermissions(['ios.permission.PHOTO_LIBRARY']))) {
    return null;
  }

  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    presentationStyle: 'pageSheet',
  });

  return result.assets?.[0];
}
