import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';

interface UpdateAlbumParams {
  id: string;
  data: Partial<Pick<Photo, 'name' | 'is_fake' | 'description'>>;
}

/**
 * 更新相册
 */
export async function updateAlbum(params: UpdateAlbumParams) {
  const result = await AppDataSource.manager.update(Photo, params.id, params.data);
  return result?.generatedMaps;
}
