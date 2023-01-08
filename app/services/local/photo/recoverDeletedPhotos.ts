import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { Status } from '@/database/entities/types';
import { deletePhotos } from './deletePhotos';

export type RecoverDeletedPhotosParams = {
  ids?: string[];
  is_all?: boolean;
  target_id: string;
  is_fake: boolean;
};

export type DestroyDeletedPhotosParams = {
  ids?: string[];
  is_all?: boolean;
  is_fake: boolean;
};

export async function recoverDeletedPhotos(params: RecoverDeletedPhotosParams) {
  const { ids, is_all, target_id, is_fake } = params;

  const updateData = {
    parent_id: target_id,
    status: Status.Normal,
  };
  // 恢复全部
  if (is_all) {
    await AppDataSource.manager.update(
      Photo,
      {
        is_fake,
        status: Status.Deleted,
      },
      updateData,
    );
  } else {
    await AppDataSource.manager.update(Photo, ids, updateData);
  }
}

export async function destroyDeletedPhotos(params: DestroyDeletedPhotosParams) {
  const { ids, is_all, is_fake } = params;

  if (is_all) {
    await deletePhotos({
      status: Status.Deleted,
      is_fake,
    });
  } else {
    await deletePhotos({
      ids,
      is_fake,
    });
  }
}
