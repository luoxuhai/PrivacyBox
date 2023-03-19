import { mkdir, moveFile } from 'react-native-fs';
import mime from 'mime';

import { AppDataSource } from '@/database';
import * as path from '@/lib/path';
import { generateUUID, LocalPathManager, reportException } from '@/utils';
import { getPhotoTypeByMime } from '@/utils/getFileTypeByMime';
import Photo from '@/database/entities/photo';
import { PhotoTypes } from '@/database/entities/types';
import { PhotoImporterResult } from '@/screens/PhotosScreen/helpers/PhotoImporter';
import { generatePhotoThumbnail } from '../helpers/generatePhotoThumbnail';
import { generateVideoPoster } from '../helpers/generateVideoPoster';
import { extname } from '@/lib/path';

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
      const { name, width, height, duration } = photo;
      if (!name) {
        continue;
      }

      let mimeType = photo.mime;
      if (!mimeType) {
        const ext = extname(name);
        const _mimeType = mime.getType(ext);
        if (ext && _mimeType.startsWith('image/')) {
          mimeType = _mimeType;
        } else {
          continue;
        }
      }

      // 文件主键
      const id = generateUUID();

      // 文件存放目录
      const destDir = path.join(LocalPathManager.photoPath, id);
      await mkdir(destDir, { NSURLIsExcludedFromBackupKey: true });
      // 最终的文件地址
      const uri = path.join(destDir, name);

      await moveFile(photo.uri, uri);

      // 文件类型
      const type = getPhotoTypeByMime(mimeType);
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
        mime: mimeType,
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
      reportException({ error, message: '添加图片视频出错', level: 'fatal' });
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
