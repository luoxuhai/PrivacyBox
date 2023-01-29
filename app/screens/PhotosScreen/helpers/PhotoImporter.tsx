import { getAssetInfoAsync } from 'expo-media-library';
import { launchCamera, launchImageLibrary } from '@react-native-library/photos-picker';
import { DocumentPickerOptions } from 'react-native-document-picker';

import { getImageSize, getVideoInfo, Overlay, PermissionManager } from '@/utils';
import { FileImporter, IResult } from '@/screens/FilesScreen/helpers/FileImporter';
import { FileTypes, PhotoSubtypes } from '@/database/entities/types';
import { getFileTypeByMime } from '@/utils/getFileTypeByMime';
import { t } from '@/i18n';
import { ImagePickerResult } from 'react-native';
import { stat } from 'react-native-fs';

export { IResult };

export interface PhotoImporterResult extends IResult {
  exif?: Record<string, any>;
  subtypes?: PhotoSubtypes[];
  location?: Location;
}

export class PhotoImporter extends FileImporter {
  public static album = {
    async open(): Promise<PhotoImporterResult[] | void> {
      if (!(await PermissionManager.checkPermissions(['ios.permission.PHOTO_LIBRARY']))) {
        return;
      }
      const result = await launchImageLibrary(
        {
          mediaType: 'mixed',
          selectionLimit: 0,
          includeExtra: true,
          quality: 1,
          presentationStyle: 'pageSheet',
        },
        null,
        () => {
          Overlay.alert({
            preset: 'spinner',
            duration: 0,
            title: t('filesScreen.import.doing'),
          });
        },
      );

      if (!result?.assets) {
        return;
      }

      const results: PhotoImporterResult[] = [];

      for (const [_, asset] of result.assets.entries()) {
        const { exif, width, height, mediaSubtypes, creationTime, modificationTime } =
          await getAssetInfoAsync(asset.id);
        results.push({
          name: asset.fileName,
          size: asset.fileSize,
          uri: asset.uri.replace('file://', ''),
          mime: asset.type,
          width,
          height,
          duration: asset.duration || 0,
          localIdentifier: asset.id,
          exif,
          subtypes: mediaSubtypes.map((val) => internalSubtypeMap[val]).filter((val) => val),
          location: asset.location,
          ctime: creationTime,
          mtime: modificationTime,
        });
      }

      return results;
    },
  };

  public static camera = {
    async open(): Promise<PhotoImporterResult[] | void> {
      if (!(await PermissionManager.checkPermissions(['ios.permission.CAMERA']))) {
        return;
      }

      const result = await launchCamera({
        cameraType: 'back',
        mediaType: 'mixed',
        presentationStyle: 'fullScreen',
      });

      if (!result?.assets) {
        return;
      }

      const asset = result.assets[0];
      const type = getFileTypeByMime(asset.type);
      const uri = asset.uri.replace('file://', '');
      const ctime = Date.now();

      console.log('uri', uri);
      const info = await transformPhotoFromUri(file.uri, type === FileTypes.Video)

      const res: PhotoImporterResult = {
        name: asset.fileName,
        uri,
        mime: asset.type,
        ctime,
        mtime: ctime,
        ...info,
      };

      console.prettyLog(res);
      return [res];
    },
  };

  public static document = {
    async open(options?: DocumentPickerOptions<'ios'>): Promise<PhotoImporterResult[] | void> {
      const files = await FileImporter.document.open(options);

      if (!files) {
        return;
      }

      Overlay.alert({
        preset: 'spinner',
        duration: 0,
        title: t('filesScreen.import.doing'),
      });

      for (const file of files) {
        const type = getFileTypeByMime(file.mime);
        const info = await transformPhotoFromUri(file.uri, type === FileTypes.Video)
        file = {...file, ...info}
      }

      return files;
    },
  };

  public static download = {
    open() {
      //
    },
  };
}

const internalSubtypeMap = {
  depthEffect: PhotoSubtypes.DepthEffect,
  hdr: PhotoSubtypes.Hdr,
  highFrameRate: PhotoSubtypes.HighFrameRate,
  livePhoto: PhotoSubtypes.LivePhoto,
  panorama: PhotoSubtypes.Panorama,
  screenshot: PhotoSubtypes.Screenshot,
  stream: PhotoSubtypes.Stream,
  timelapse: PhotoSubtypes.Timelapse,
};

async function transformPhotoFromUri(uri: string, isVideo: boolean, includeSize = flase) {
  const result = {};

  if (isVideo) {
    const { width, height, duration } = await getVideoInfo(uri);
    result.width = width;
    result.height = height;
    result.duration = duration;
  } else {
    const { width, height } = await getImageSize(uri);
    result.width = width;
    result.height = height;
  }

  if (includeSize) {
    const { size } = await stat(uri);
    result.size = size;
  }

  return result
}