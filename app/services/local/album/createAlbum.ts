import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes } from '@/database/entities/types';
import { generateUUID } from '@/utils';

type CreateAlbumParams = Partial<Pick<Photo, 'name' | 'is_fake'>>;

/**
 * 创建相册
 */
export async function createAlbum(params: CreateAlbumParams) {
  const result = await AppDataSource.manager.insert(Photo, {
    id: generateUUID(),
    is_fake: params.is_fake,
    name: params.name,
    parent_id: null,
    type: PhotoTypes.Folder,
  });

  return result?.generatedMaps;
}
