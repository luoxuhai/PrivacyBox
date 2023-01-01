import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes, Status } from '@/database/entities/types';

interface FetchAlbumDetailParams {
  id: string;
  status: Status;
}

export async function fetchAlbumDetail(params: FetchAlbumDetailParams) {
  const { status, id } = params;
  const photoCount = await AppDataSource.manager.count(Photo, {
    where: {
      type: PhotoTypes.Photo,
      status,
      parent_id: id,
    },
  });

  const videoCount = await AppDataSource.manager.count(Photo, {
    where: {
      type: PhotoTypes.Video,
      status,
      parent_id: id,
    },
  });

  return {
    photoCount,
    videoCount,
  };
}
