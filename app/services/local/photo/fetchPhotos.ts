import { In, FindOptionsOrder } from 'typeorm';

import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes, Status } from '@/database/entities/types';
import { joinPhotoUri } from '../helpers/joinPhotoUri';
import { joinPhotoThumbnail } from '../helpers/joinPhotoThumbnail';
import { joinVideoPoster } from '../helpers/joinVideoPoster';

type FetchPhotosParams = Partial<Pick<Photo, 'name' | 'status' | 'is_fake' | 'parent_id'>> & {
  order_by?: OrderBy<Partial<Photo>>;
};

export type FetchPhotosResult = Photo & {
  /** 图片/视频资源地址 */
  uri: string;
  /** 缩略图 */
  thumbnail?: string;
  /** 视频封面 */
  poster?: string;
};

/**
 * 获取所有图片/视频
 */
export async function fetchPhotos(params: FetchPhotosParams): Promise<FetchPhotosResult[]> {
  const { order_by, ...rest } = params;

  const order: FindOptionsOrder<Photo> = (order_by as unknown as FindOptionsOrder<Photo>) ?? {
    created_date: 'DESC',
  };

  const result = (await AppDataSource.manager.find(Photo, {
    where: {
      status: Status.Normal,
      ...rest,
      type: In([PhotoTypes.Photo, PhotoTypes.Video]),
    },
    order,
  })) as FetchPhotosResult[];

  for (const item of result) {
    attachSourceUriForPhoto(item);
  }

  return result;
}

export function attachSourceUriForPhoto(item: FetchPhotosResult) {
  item.uri = joinPhotoUri(item);
  item.thumbnail = joinPhotoThumbnail(item.id);

  if (item.type === PhotoTypes.Video) {
    item.poster = joinVideoPoster(item.id);
  }
}
