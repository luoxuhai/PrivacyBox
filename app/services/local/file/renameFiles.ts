import { moveFile } from 'react-native-fs';

import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { join } from '@/lib/path';
import { LocalPathManager } from '@/utils';

type RenameFilesParams = Pick<File, 'id' | 'name'>;

/**
 * 更新文件名称
 */
export async function renameFiles(params: RenameFilesParams) {
  const { id, name } = params;
  const criteria = { id };
  const oldData = await AppDataSource.manager.findOneBy(File, criteria);
  const result = await AppDataSource.manager.update(File, criteria, { name });

  const oldUri = join(LocalPathManager.filePath, id, oldData.name);
  const newUri = join(LocalPathManager.filePath, id, name);

  try {
    await moveFile(oldUri, newUri);
  } catch (error) {
    await AppDataSource.manager.update(File, criteria, { name: oldData.name });
    return null;
  }

  return result?.generatedMaps;
}
