import File from '@/database/entities/file';
import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

export function joinFileUri(file: Pick<File, 'id' | 'name'>) {
  return join(LocalPathManager.filePath, file.id, file.name);
}
