import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes, Status } from '@/database/entities/types';
import { rootStore } from '@/models';
import { JSONParse } from '@/utils/storage/storage';
import { fetchAlbumCover, FetchAlbumsResult, fetchItemCount } from '../album';
import { attachSourceUriForPhoto, FetchPhotosResult } from '../photo';

export interface SearchPhotosParams extends Pick<Photo, 'is_fake'> {
  keywords: string;
  type?: Photo['type'];
}

export type SearchPhotosResult = FetchPhotosResult & FetchAlbumsResult;

export async function searchPhotos(params: SearchPhotosParams) {
  const { keywords, type, is_fake } = params;

  let sqlStr = `(name LIKE "%${keywords ?? ''}%" OR description LIKE "%${keywords ?? ''}%"`;

  if (rootStore.settingsStore.smartSearchEnabled) {
    sqlStr += ` OR exists (SELECT * FROM json_each(json_extract(photo.labels, '$.zh_cn')) WHERE json_each.value LIKE "%${
      keywords ?? ''
    }%")`;
  }

  sqlStr += ')';

  if (type) {
    sqlStr += ` AND type = ${type}`;
  }

  sqlStr += ` AND status = ${Status.Normal} AND is_fake = ${is_fake}`;

  const items = (await AppDataSource.manager.query(
    `SELECT * FROM photo WHERE ${sqlStr} ORDER BY type DESC`,
  )) as SearchPhotosResult[];

  for (const item of items) {
    const { image_details, video_details } = item;
    item.item_count = await fetchItemCount(item);
    item.cover = await fetchAlbumCover(item);

    if (item.type !== PhotoTypes.Folder) {
      attachSourceUriForPhoto(item);

      if (video_details) {
        item.video_details = JSONParse(video_details);
      }
    } else {
      if (image_details) {
        item.image_details = JSONParse(image_details);
      }
    }
  }

  return items;
}
