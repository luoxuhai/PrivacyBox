import { moveFile } from 'react-native-fs';

import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { joinPhotoUri } from '../helpers/joinPhotoUri';

export type RenamePhotoParams = Pick<Photo, 'id' | 'name'>;

export async function renamePhoto(params: RenamePhotoParams) {
  const { id, name } = params;
  const oldData = await AppDataSource.manager.findOneBy(Photo, { id });
  const result = await AppDataSource.manager.update(Photo, id, { name });

  const oldUri = joinPhotoUri(oldData);
  const newUri = joinPhotoUri({ id, name });

  try {
    await moveFile(oldUri, newUri);
  } catch (error) {
    await AppDataSource.manager.update(Photo, id, { name: oldData.name });
    throw error;
  }

  return result?.generatedMaps;
}
