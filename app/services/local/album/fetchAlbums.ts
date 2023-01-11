import { getAvailableThumbnail } from '@/components';
import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes, Status } from '@/database/entities/types';
import { joinPhotoThumbnail } from '../helpers/joinPhotoThumbnail';
import { joinPhotoUri } from '../helpers/joinPhotoUri';
import { joinVideoPoster } from '../helpers/joinVideoPoster';

type FetchAlbumsParams = Partial<Pick<Photo, 'name' | 'status' | 'is_fake'>>;

export type FetchAlbumsResult = Photo & {
  item_count: number;
  cover: string;
};

/**
 * 获取所有相册
 */
export async function fetchAlbums(params: FetchAlbumsParams): Promise<FetchAlbumsResult[]> {
  const result = (await AppDataSource.manager.find(Photo, {
    where: {
      status: Status.Normal,
      ...params,
      type: PhotoTypes.Folder,
    },
  })) as FetchAlbumsResult[];

  for (const item of result) {
    item.item_count = await fetchItemCount(item);
    item.cover = await fetchAlbumCover(item);
  }

  return result;
}

export async function fetchItemCount(parentItem: Photo) {
  const count = await AppDataSource.manager.count(Photo, {
    where: {
      parent_id: parentItem.id,
      status: parentItem.status,
    },
  });

  return count;
}

export async function fetchAlbumCover(item: Photo) {
  const firstItem = await AppDataSource.manager.findOne(Photo, {
    where: {
      parent_id: item.id,
      status: item.status,
    },
    order: {
      created_date: 'DESC',
    },
  });

  if (!firstItem) {
    return null;
  }

  const thumbnail = joinPhotoThumbnail(firstItem.id);
  const poster = joinVideoPoster(firstItem.id);
  const uri = joinPhotoUri(firstItem);

  const availableThumbnail = await getAvailableThumbnail({
    thumbnail,
    poster,
  });

  if (!availableThumbnail) {
    return item.type === PhotoTypes.Video ? null : uri;
  }

  return availableThumbnail;
}
