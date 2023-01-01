import Photo from '@/database/entities/photo';
import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

export function joinPhotoUri(file: Photo) {
  return join(LocalPathManager.photoPath, file.id, file.name);
}
