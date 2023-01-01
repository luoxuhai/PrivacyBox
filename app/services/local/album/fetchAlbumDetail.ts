import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes } from '@/database/entities/types';

export async function fetchAlbumDetail() {
  const photoCount = await AppDataSource.manager.count(Photo, {
    where: {
      type: PhotoTypes.Photo,
    },
  });

  const videoCount = await AppDataSource.manager.count(Photo, {
    where: {
      type: PhotoTypes.Video,
    },
  });

  return {
    photoCount,
    videoCount,
  };
}
