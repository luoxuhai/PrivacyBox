import { Not } from 'typeorm';
import { exists } from 'react-native-fs';

import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes } from '@/database/entities/types';
import { joinPhotoUri } from '@/services/local/helpers/joinPhotoUri';
import { FetchPhotosResult } from '@/services/local/photo/fetchPhotos';

export async function fetchAllPhotoUris() {
  const photos = (await AppDataSource.manager.find(Photo, {
    select: {
      id: true,
      name: true,
    },
    where: {
      type: Not(PhotoTypes.Folder),
    },
  })) as FetchPhotosResult[];

  const uris: string[] = [];
  for (const photo of photos) {
    const uri = joinPhotoUri(photo);
    if (await exists(uri)) {
      uris.push(uri);
    }
  }

  return uris;
}

// export function d() {

// }