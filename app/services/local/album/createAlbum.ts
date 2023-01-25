import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes } from '@/database/entities/types';
import { generateUUID } from '@/utils';
import { t } from '@/i18n';

type CreateAlbumParams = Partial<Pick<Photo, 'id' | 'name' | 'is_fake'>>;

/**
 * 创建相册
 */
export async function createAlbum(params: CreateAlbumParams) {
  const { id, is_fake, name } = params;

  const exists = await AppDataSource.manager.exists(Photo, {
    where: {
      name,
      is_fake,
    },
  });

  if (exists) {
    throw Error(t('albumsScreen.createAlbum.sameName'));
  }

  const result = await AppDataSource.manager.insert(Photo, {
    id: id || generateUUID(),
    is_fake,
    name,
    parent_id: null,
    type: PhotoTypes.Folder,
  });

  return result?.generatedMaps;
}
