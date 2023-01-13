import { mkdir, moveFile } from 'react-native-fs';

import { AppDataSource } from '@/database';
import * as path from '@/lib/path';
import { generateUUID, LocalPathManager } from '@/utils';
import { getPhotoTypeByMime } from '@/utils/getFileTypeByMime';
import Photo from '@/database/entities/photo';
import { PhotoTypes } from '@/database/entities/types';
import { PhotoImporterResult } from '@/screens/PhotosScreen/helpers/PhotoImporter';
import { generatePhotoThumbnail } from '../helpers/generatePhotoThumbnail';
import { generateVideoPoster } from '../helpers/generateVideoPoster';

type PhotoSource = PhotoImporterResult;

type AddFilesParams = {
  album_id: string;
  is_fake: boolean;
  photos: PhotoSource[];
};

/**
 * 删除文件
 */
export async function addPhotos(params: AddFilesParams) {
  if (!isValidParams(params)) {
    throw Error('invalid params');
  }

  const { album_id, is_fake = false } = params;

  const importedPhotos: PhotoSource[] = [];

  for (const photo of params.photos) {
    try {
      const { name, mime, width, height, duration } = photo;
      // 文件主键
      const id = generateUUID();

      // 文件存放目录
      const destDir = path.join(LocalPathManager.photoPath, id);
      await mkdir(destDir, { NSURLIsExcludedFromBackupKey: true });

      // 最终的文件地址
      const uri = path.join(destDir, name);
      await moveFile(photo.uri, uri);

      // 文件类型
      const type = getPhotoTypeByMime(mime);
      // 视频需要先获取封面
      if (type === PhotoTypes.Video) {
        await generateVideoPoster(id, uri, duration);
        await generatePhotoThumbnail({ id, uri, isVideo: true });
      } else {
        await generatePhotoThumbnail({ id, uri, isVideo: false });
      }

      const createdDate = Date.now();
      const data: Photo = {
        id,
        parent_id: album_id,
        name,
        size: photo.size,
        mime: photo.mime,
        is_fake,
        type,
        metadata: {
          localIdentifier: photo.localIdentifier,
          exif: photo.exif,
          location: photo.location,
          ctime: photo.ctime,
          mtime: photo.mtime,
        },
        created_date: createdDate,
        updated_date: createdDate,
      };

      if (type === PhotoTypes.Photo) {
        data.image_details = {
          width,
          height,
        };
      } else {
        data.video_details = {
          width,
          height,
          duration,
        };
      }

      await AppDataSource.manager.insert(Photo, data);
      importedPhotos.push(photo);
    } catch (error) {
      console.error('[Add File]', error);
    }
  }

  return importedPhotos;
}

function isValidParams(params: AddFilesParams) {
  return params.photos.length && params.album_id;
}

// function getCriteria(params: DeleteFilesParams) {
//   return params.id ?? params.ids;
// }
