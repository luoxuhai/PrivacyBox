import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { FileTypes } from '@/database/entities/types';
import { PhotoImporterResult } from '@/screens/PhotosScreen/helpers/PhotoImporter';
import { getImageSize, getVideoInfo } from '@/utils';
import { joinFileUri } from '../helpers/joinFileUri';
import { addPhotos } from '../photo';
import { removeFilesFromDisk } from './deleteFiles';

export interface MoveFileToAlbumParams {
  ids?: string[];
  // 目标相册id
  album_id: string;
}

export async function moveFileToAlbum(params: MoveFileToAlbumParams) {
  const { ids, album_id } = params;
  const id = ids[0];

  const file = await AppDataSource.manager.findOneBy(File, { id });
  const uri = joinFileUri(file);

  if (![FileTypes.Image, FileTypes.Video].includes(file.type)) {
    return;
  }

  const photo: PhotoImporterResult = {
    name: file.name,
    uri,
    mime: file.mime,
    size: file.size,
    ctime: file.created_date,
    mtime: file.updated_date,
  };

  if (file.type === FileTypes.Image) {
    const { width, height } = await getImageSize(uri);
    photo.width = width;
    photo.height = height;
  } else if (file.type === FileTypes.Video) {
    const { width, height, duration } = await getVideoInfo(uri);
    photo.width = width;
    photo.height = height;
    photo.duration = duration;
  }

  const importedPhotos = await addPhotos({
    album_id,
    is_fake: file.is_fake,
    photos: [photo],
  });

  if (importedPhotos.length === 0) {
    throw Error('');
  }

  await AppDataSource.manager.delete(File, id);
  removeFilesFromDisk([id]);
}
