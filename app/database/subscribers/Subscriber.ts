import debounce from 'lodash/debounce';
import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import Photo from '../entities/photo';

@EventSubscriber()
export class Subscriber implements EntitySubscriberInterface {
  afterInsert(event: InsertEvent<Photo>): void | Promise<any> {
    // uploadToICloud();
  }

  afterUpdate(event: UpdateEvent<Photo>): void | Promise<any> {
    // uploadToICloud();
  }

  beforeUpdate(event: UpdateEvent<Photo>): void {
    event.entity.updated_date = Date.now();
  }

  beforeInsert(event: InsertEvent<Photo>): void {
    const now = Date.now();
    event.entity.created_date = now;
    event.entity.updated_date = now;
  }
}

function uploadToICloud() {
  return debounce(() => {
    console.log('xxxxxx uploadToICloud');
  }, 5000);
}
