import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';

export type DeleteAlbumParams = Partial<Pick<Photo, 'id'>>;

/**
 * 删除相册
 */
export async function deleteAlbum(params: DeleteAlbumParams) {
  if (!params.id) {
    throw Error('missing params.id');
  }
  const result = await AppDataSource.manager.delete(Photo, params.id);

  return result;
}

export async function softDeleteAlbum(params: DeleteAlbumParams) {
  if (!params.id) {
    throw Error('missing params.id');
  }
  const result = await AppDataSource.manager.delete(Photo, params.id);

  return result;
}
