import { moveFile } from 'react-native-fs';

import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

type UpdatePhotoParams = {
    id: string;
    data: Pick<File, 'description'>;
}

export async function updatePhoto(params: UpdatePhotoParams) {
  const { id, data } = params;

  const result = await AppDataSource.manager.update(Photo, id, data);

  return result;
}
