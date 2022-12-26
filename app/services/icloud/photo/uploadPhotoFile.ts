import { writeFile } from 'react-native-fs';

import Photo from '@/database/entities/photo';
import { ICloud } from '../icloud';
import { LocalPathManager } from '@/utils';

export async function uploadPhotoFile(photos: Photo[]) {
  const path = `${LocalPathManager.tempPath}/photos.json`;
  await writeFile(path, JSON.stringify(photos), 'utf8');
  if (!(await ICloud.exist('photos'))) {
    await ICloud.createDir('photos');
  }

  ICloud.upload(path, 'photos/photos.json', { onProgress: console.log });
}
