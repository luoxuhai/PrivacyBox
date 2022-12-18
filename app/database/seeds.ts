import { EntityManager } from 'typeorm';

import File from './entities/file';
import Photo, { PhotoType } from './entities/photo';
import { storage } from '@/storage';

const photoSeeds: Photo[] = [
  {
    name: '图片 🏞️',
    type: PhotoType.Folder,
    parent_id: null,
  },
  {
    name: '视频 📀',
    type: PhotoType.Folder,
    parent_id: null,
  },
];

const fileSeeds: File[] = [
  {
    name: '默认文件夹 🗂️',
    is_fake: false,
    parent_id: null,
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
