import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

export function joinPhotoThumbnail(id: string) {
  return join(LocalPathManager.photoPath, id, 'thumbnail.jpg');
}
