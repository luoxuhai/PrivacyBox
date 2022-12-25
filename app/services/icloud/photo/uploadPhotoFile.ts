import { writeFile } from 'react-native-fs';

import Photo from '@/database/entities/photo';
import { ICloud } from '../icloud';
import { LocalPathManager } from '@/utils';

export async function uploadPhotoFile(photos: Photo[]) {
  const path = `${LocalPathManager.tempPath}/photos.json`;
  await writeFile(path, JSON.stringify(photos), 'utf8');
  if (!(await ICloud.exist('media'))) {
    await ICloud.createDir('media');
  }

  ICloud.upload(path, 'media/photos.json', { onProgress: console.log });
}
