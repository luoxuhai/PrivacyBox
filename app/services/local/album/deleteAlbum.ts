import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';

type DeleteAlbumParams = Partial<Pick<Photo, 'id'>>;

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
