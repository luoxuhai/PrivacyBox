import { EntityManager } from 'typeorm';

import File from './entities/file';
import Photo from './entities/photo';
import { storage } from '@/utils/storage';
import { generateUUID } from '@/utils/uuid';
import { FileTypes, PhotoTypes } from './entities/types';
import { t } from '@/i18n';

const photoSeeds: Photo[] = [
  {
    id: generateUUID(),
    name: t('dbSeeds.picture'),
    type: PhotoTypes.Folder,
    parent_id: null,
  },
  {
    id: generateUUID(),
    name: t('dbSeeds.video'),
    type: PhotoTypes.Folder,
    parent_id: null,
  },
];

const fileSeeds: File[] = [
  {
    id: generateUUID(),
    name: t('dbSeeds.folder'),
    is_fake: false,
    parent_id: null,
    type: FileTypes.Folder,
  },
];

export async function loadFixtures(manager: EntityManager) {
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
