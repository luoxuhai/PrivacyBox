import { moveFile } from 'react-native-fs';

import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

type RenamePhotoParams = Pick<File, 'id' | 'name'>;

export async function renamePhoto(params: RenamePhotoParams) {
  const { id, name } = params;
  const criteria = { id };
  const oldData = await AppDataSource.manager.findOneBy(Photo, criteria);
  const result = await AppDataSource.manager.update(Photo, criteria, { name });

  const oldUri = join(LocalPathManager.filePath, id, oldData.name);
  const newUri = join(LocalPathManager.filePath, id, name);

  try {
    await moveFile(oldUri, newUri);
  } catch (error) {
    await AppDataSource.manager.update(Photo, criteria, { name: oldData.name });
    return null;
  }

  return result?.generatedMaps;
}
