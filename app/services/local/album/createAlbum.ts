import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes } from '@/database/entities/types';
import { generateUUID } from '@/utils';
import { t } from '@/i18n';

type CreateAlbumParams = Partial<Pick<Photo, 'name' | 'is_fake'>>;

/**
 * 创建相册
 */
export async function createAlbum(params: CreateAlbumParams) {
  const exists = await AppDataSource.manager.exists(Photo, {
    where: {
      name: params.name,
      is_fake: params.is_fake,
    },
  });

  if (exists) {
    throw Error(t('albumsScreen.createAlbum.sameName'));
  }

  const result = await AppDataSource.manager.insert(Photo, {
    id: generateUUID(),
    is_fake: params.is_fake,
    name: params.name,
    parent_id: null,
    type: PhotoTypes.Folder,
  });

  return result?.generatedMaps;
}
