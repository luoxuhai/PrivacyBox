import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';

export type MovePhotosParams = {
  ids?: string[];
  // 目标相册id
  target_id: string;
};

/**
 * 移动图片/视频
 */
export async function movePhotos(params: MovePhotosParams) {
  const { ids, target_id } = params;

  const result = await AppDataSource.manager.update(Photo, ids, {
    parent_id: target_id,
  });

  return result;
}
