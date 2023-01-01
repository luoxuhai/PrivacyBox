import { writeFile } from 'react-native-fs';

import Photo from '@/database/entities/photo';
import { ICloud } from '../icloud';
import { LocalPathManager } from '@/utils';

export async function uploadPhotos(photos: Photo[]) {
  return;
  const path = `${LocalPathManager.tempPath}/photos.json`;
  await writeFile(path, JSON.stringify(photos), 'utf8');
  await ICloud.createDir('db');
  ICloud.upload(path, 'db/photos.json', { onProgress: console.log });
}
