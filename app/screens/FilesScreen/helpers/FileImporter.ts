import DocumentPicker, { DocumentPickerOptions } from 'react-native-document-picker';
import { DocumentCamera } from 'react-native-app-toolkit';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Alert } from 'react-native';
import mime from 'mime';
import { getAssetInfoAsync } from 'expo-media-library';

import { translate } from '@/i18n';
import { randomNum, PermissionManager } from '@/utils';

export interface IResult {
  /** 文件的显示名称 */
  name?: string;
  uri?: string;
  mime: string | null;
  size?: number | null;
  // 相册专属
  localIdentifier?: string;
  width?: number;
  height?: number;
  // 视频时长
  duration?: number;
}

export class FileImporter {
  public static album = {
    async open(): Promise<IResult[] | void> {
      if (!(await PermissionManager.checkPermissions(['ios.permission.PHOTO_LIBRARY']))) {
        return;
      }
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 0,
        includeExtra: true,
        quality: 1,
        presentationStyle: 'pageSheet',
      });

      return result.assets.map((asset) => ({
        name: asset.fileName,
        size: asset.fileSize,
        uri: asset.uri.replace('file://', ''),
        mime: asset.type,
        width: asset.width,
        height: asset.height,
        duration: asset.duration ? asset.duration * 1000 : 0,
        localIdentifier: asset.id,
      }));
    },
  };

  public static document = {
    async open(options?: DocumentPickerOptions<'ios'>): Promise<IResult[] | void> {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
        allowMultiSelection: true,
        presentationStyle: 'pageSheet',
        ...options,
      });

      return result.map((item) => ({
        name: item.name,
        uri: decodeURI(item.uri?.replace(/^file:\/\//, '')),
        size: item.size,
        mime: item.type,
      }));
    },
  };

  public static documentCamera = {
    async open(): Promise<IResult[] | void> {
      if (!(await PermissionManager.checkPermissions(['ios.permission.CAMERA']))) {
        return;
      }

      if (!(await DocumentCamera.isSupported())) {
        Alert.alert(translate('filesScreen.import.nonsupport'));
        return;
      }

      const result = await DocumentCamera.open();

      return [
        {
          name: `scan-${randomNum(5)}-${performance.now()}.pdf`,
          size: 0,
          mime: mime.getType('pdf'),
          uri: result.source,
        },
      ];
    },
  };

  public static camera = {
    async open(): Promise<IResult[] | void> {
      if (!(await PermissionManager.checkPermissions(['ios.permission.CAMERA']))) {
        return;
      }

      const result = await launchCamera({
        cameraType: 'back',
        mediaType: 'mixed',
        presentationStyle: 'fullScreen',
        saveToPhotos: false,
      });

      return result.assets?.map((asset) => ({
        name: asset.fileName,
        size: asset.fileSize,
        uri: asset.uri.replace('file://', ''),
        mime: asset.type,
        width: asset.width,
        height: asset.height,
        duration: asset.duration ? asset.duration * 1000 : 0,
      }));
    },
  };
}
