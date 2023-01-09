import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { Status } from '@/database/entities/types';
import { rootStore } from '@/models';
import { FetchPhotosResult } from '../photo';

export interface SearchPhotosParams extends Pick<Photo, 'is_fake'> {
  keywords: string;
  type?: Photo['type'];
}

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

  const photos = (await AppDataSource.manager.query(
    `SELECT * FROM photo WHERE ${sqlStr} ORDER BY type DESC`,
  )) as FetchPhotosResult[];

  console.log('photos', photos);
  return photos;
}
