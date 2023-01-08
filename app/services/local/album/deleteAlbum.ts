import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { softDeletePhotos, deletePhotos } from '../photo';

export type DeleteAlbumParams = Partial<Pick<Photo, 'id'>>;

/**
 * 删除相册
 */
export async function deleteAlbum(params: DeleteAlbumParams) {
  if (!params.id) {
    throw Error('missing params.id');
  }

  await AppDataSource.manager.delete(Photo, params.id);
  await deletePhotos({ album_id: params.id });
}

export async function softDeleteAlbum(params: DeleteAlbumParams) {
  if (!params.id) {
    throw Error('missing params.id');
  }

  await AppDataSource.manager.delete(Photo, params.id);
  await softDeletePhotos({ album_id: params.id });
}
