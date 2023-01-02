import DocumentPicker, { DocumentPickerOptions } from 'react-native-document-picker';
import { DocumentCamera } from 'react-native-app-toolkit';
import { Alert } from 'react-native';
import { stat } from 'react-native-fs';
import mime from 'mime';

import { translate } from '@/i18n';
import { randomNum, PermissionManager } from '@/utils';

export interface IResult {
  /** 文件的显示名称 */
  name: string;
  uri: string;
  mime: string | null;
  size: number | null;
  ctime: number;
  mtime: number;
  // 相册专属
  localIdentifier?: string;
  width?: number;
  height?: number;
  // 视频时长
  duration?: number;
}

export class FileImporter {
  public static document = {
    async open(options?: DocumentPickerOptions<'ios'>): Promise<IResult[]> {
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
        ctime: item.ctime,
        mtime: item.mtime,
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

      const result = await DocumentCamera.open({
        type: 'pdf',
        quality: 1,
      });

      const { size } = await stat(result.source);

      const ctime = Date.now();
      return [
        {
          name: `SCAN-${randomNum(5)}-${Date.now()}.pdf`,
          size,
          mime: mime.getType('pdf'),
          uri: result.source,
          ctime,
          mtime: ctime,
        },
      ];
    },
  };
}
