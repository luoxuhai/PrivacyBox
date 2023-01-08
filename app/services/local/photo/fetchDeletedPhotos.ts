import Photo from '@/database/entities/photo';
import { Status } from '@/database/entities/types';
import { fetchPhotos, FetchPhotosResult } from './fetchPhotos';

type FetchDeletedPhotosParams = Partial<Pick<Photo, 'is_fake'>>;

/**
 * 获取已经删除的图片/视频
 */
export async function fetchDeletedPhotos(
  params: FetchDeletedPhotosParams,
): Promise<FetchPhotosResult[]> {
  const { is_fake } = params;

  const order: OrderBy<Partial<Photo>> = {
    deleted_date: 'DESC',
  };

  const result = await fetchPhotos({
    order_by: order,
    is_fake,
    status: Status.Deleted,
  });

  return result;
}
