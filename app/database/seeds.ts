import { EntityManager } from 'typeorm';

import File from './entities/file';
import Photo from './entities/photo';
import { storage } from '@/utils/storage';
import { generateUUID } from '@/utils/uuid';
import { FileTypes, PhotoTypes } from './entities/types';

const photoSeeds: Photo[] = [
  {
    id: generateUUID(),
    name: '图片 🏞️',
    type: PhotoTypes.Folder,
    parent_id: null,
  },
  {
    id: generateUUID(),
    name: '视频 📀',
    type: PhotoTypes.Folder,
    parent_id: null,
  },
];

const fileSeeds: File[] = [
  {
    id: generateUUID(),
    name: '默认文件夹 🗂️',
    is_fake: false,
    parent_id: null,
    type: FileTypes.Folder,
  },
];

export async function loadFixtures(manager: EntityManager) {
  console.log('isInitializedDBSeed', storage.get('isInitializedDBSeed', 'boolean'));
  if (storage.get('isInitializedDBSeed', 'boolean')) {
    return;
  }

  try {
    await manager.insert(Photo, photoSeeds);
    await manager.insert(File, fileSeeds);
  } catch (error) {
    console.error(error);
  }

  storage.set('isInitializedDBSeed', true);
}
