import debounce from 'lodash/debounce';
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  EntityManager,
} from 'typeorm';

import { uploadPhotos } from '@/services/icloud/photo';
import Photo from '../entities/photo';

@EventSubscriber()
export class PhotoSubscriber implements EntitySubscriberInterface<Photo> {
  listenTo() {
    return Photo;
  }

  afterInsert(event: InsertEvent<Photo>): void | Promise<any> {
    console.log('afterInsert', event.metadata.columns);
    queryAllPhotos(event.connection.manager);
    uploadToICloud();
  }

  afterUpdate(event: UpdateEvent<Photo>): void | Promise<any> {
    console.log('afterUpdate', event.connection.manager);
    queryAllPhotos(event.connection.manager);
  }
}

function uploadToICloud() {
  console.log('xxxxxx uploadToICloud');
  return debounce(() => {
    console.log('xxxxxx uploadToICloud');
  }, 5000);
}

async function queryAllPhotos(manager: EntityManager) {
  const photos = await manager.find(Photo);
  uploadPhotos(photos);
  console.log('photos', photos);
}