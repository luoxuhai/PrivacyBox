import { getAssetInfoAsync } from 'expo-media-library';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DocumentPickerOptions } from 'react-native-document-picker';

import { getImageSize, getVideoInfo, PermissionManager } from '@/utils';
import { FileImporter, IResult } from '@/screens/FilesScreen/helpers/FileImporter';
import { FileTypes, PhotoSubtypes } from '@/database/entities/types';
import { getFileTypeByMime } from '@/utils/getFileTypeByMime';

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
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        selectionLimit: 0,
        includeExtra: true,
        quality: 1,
        presentationStyle: 'pageSheet',
      });

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
        saveToPhotos: false,
      });

      const ctime = Date.now();
      return result.assets?.map((asset) => ({
        name: asset.fileName,
        size: asset.fileSize,
        uri: asset.uri.replace('file://', ''),
        mime: asset.type,
        width: asset.width,
        height: asset.height,
        duration: asset.duration || 0,
        ctime,
        mtime: ctime,
      }));
    },
  };

  public static document = {
    async open(options?: DocumentPickerOptions<'ios'>) {
      const files = await FileImporter.document.open(options);

      for (const file of files) {
        const type = getFileTypeByMime(file.mime);

        if (type === FileTypes.Image) {
          const { width, height } = await getImageSize(file.uri);
          file.width = width;
          file.height = height;
        }

        if (type === FileTypes.Video) {
          const { width, height, duration } = await getVideoInfo(file.uri);
          file.width = width;
          file.height = height;
          file.duration = duration;
        }
      }

      return files;
    },
  };

  public static download = {
    open() {
      console.log('download');
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
