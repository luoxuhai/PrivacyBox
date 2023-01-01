import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes, Status } from '@/database/entities/types';

type FetchAlbumsParams = Partial<Pick<Photo, 'name' | 'status' | 'is_fake'>>;

type FetchAlbumsResult = Photo & {
  item_count: number;
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
  }

  return result;
}

async function fetchItemCount(parentItem: Photo) {
  const count = await AppDataSource.manager.count(Photo, {
    where: {
      parent_id: parentItem.id,
      status: parentItem.status,
    },
  });

  return count;
}
