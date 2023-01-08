import { unlink } from 'react-native-fs';

import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { Status } from '@/database/entities/types';
import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

export type DeletePhotosParams = {
  ids?: string[];
  album_id?: string;
  status?: Status;
  is_fake?: boolean;
};

/**
 * 删除图片/视频
 */
export async function deletePhotos(params: DeletePhotosParams) {
  const { album_id, ids, status, is_fake } = params;

  // 按照相册删除
  if (album_id) {
    const photos = await AppDataSource.manager.find(Photo, {
      select: {
        id: true,
      },
      where: {
        parent_id: album_id,
        // 只删除正常状态的文件
        status: Status.Normal,
      },
    });

    await removeFiles(photos.map((photo) => photo.id));

    // 按照 ids 删除
  } else if (ids) {
    await AppDataSource.manager.delete(Photo, ids);

    await removeFiles(ids);

    // 按照状态删除
  } else if (status) {
    const criteria = {
      status,
      is_fake,
    };
    const photos = await AppDataSource.manager.find(Photo, {
      select: {
        id: true,
      },
      where: criteria,
    });
    await AppDataSource.manager.delete(Photo, criteria);
    await removeFiles(photos.map((photo) => photo.id));
  }
}

export async function softDeletePhotos(params: DeletePhotosParams) {
  const criteria = generateCriteria(params);

  const result = await AppDataSource.manager.update(Photo, criteria, {
    status: Status.Deleted,
    deleted_date: Date.now(),
  });

  return result;
}

function generateCriteria(params: DeletePhotosParams) {
  return (
    params.ids ?? {
      parent_id: params.album_id,
    }
  );
}

async function removeFiles(ids: string[]) {
  for (const id of ids) {
    try {
      await unlink(join(LocalPathManager.photoPath, id));
    } catch (error) {
      console.error(error);
    }
  }
}

// function generateQueryCriteria(params: DeletePhotosParams) {
//   return {
//     parent_id: params.album_id,
//   }(
//     params.ids ?? {
//       parent_id: params.album_id,
//     },
//   );
// }
