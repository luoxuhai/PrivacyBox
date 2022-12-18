import { AppDataSource } from '@/database';
import Photo, { PhotoType } from '@/database/entities/photo';

type QueryAlbumsParams = Partial<Pick<Photo, 'name' | 'status' | 'is_fake'>>;

type QueryAlbumsResult = Photo & {
  item_count: number;
};

/**
 * 获取所以相册
 */
export async function fetchAlbums(params: QueryAlbumsParams): Promise<QueryAlbumsResult[]> {
  const result = (await AppDataSource.manager.find(Photo, {
    where: {
      ...params,
      type: PhotoType.Folder,
    },
  })) as QueryAlbumsResult[];

  for (const item of result) {
    item.item_count = await fetchItemCount(item.id);
  }

  return result;
}

async function fetchItemCount(id: string) {
  const count = await AppDataSource.manager.count(Photo, {
    where: { parent_id: id },
  });

  return count;
}
