import Photo from '@/database/entities/photo';
import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

export function joinVideoPoster(photo: Photo) {
  return join(LocalPathManager.photoPath, photo.id, 'poster.jpg');
}
