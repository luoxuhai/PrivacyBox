import { Not } from 'typeorm';

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
    uris.push(joinPhotoUri(photo));
  }

  return uris;
}
