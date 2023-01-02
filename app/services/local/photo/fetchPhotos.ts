import { In } from 'typeorm';

import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes, Status } from '@/database/entities/types';
import { joinPhotoUri } from '../helpers/joinPhotoUri';
import { joinPhotoThumbnail } from '../helpers/joinPhotoThumbnail';
import { joinVideoPoster } from '../helpers/joinVideoPoster';

type FetchPhotosParams = Partial<Pick<Photo, 'name' | 'status' | 'is_fake' | 'parent_id'>>;

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
  const result = (await AppDataSource.manager.find(Photo, {
    where: {
      status: Status.Normal,
      ...params,
      type: In([PhotoTypes.Photo, PhotoTypes.Video]),
    },
  })) as FetchPhotosResult[];

  for (const item of result) {
    item.uri = joinPhotoUri(item);
    item.thumbnail = joinPhotoThumbnail(item.id);

    if (item.type === PhotoTypes.Video) {
      item.poster = joinVideoPoster(item);
    }
  }

  return result;
}
