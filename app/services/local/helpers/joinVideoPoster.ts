import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

export function joinVideoPoster(id: string) {
  return join(LocalPathManager.photoPath, id, 'poster.jpg');
}
