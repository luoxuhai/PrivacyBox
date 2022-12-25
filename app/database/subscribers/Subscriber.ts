import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';

import Photo from '../entities/photo';
import File from '../entities/file';

@EventSubscriber()
export class Subscriber implements EntitySubscriberInterface {
  beforeUpdate(event: UpdateEvent<Photo | File>): void {
    event.entity.updated_date = Date.now();
  }

  beforeInsert(event: InsertEvent<Photo | File>): void {
    const now = Date.now();
    event.entity.created_date = now;
    event.entity.updated_date = now;
  }
}
