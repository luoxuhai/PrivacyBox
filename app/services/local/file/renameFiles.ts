import { moveFile } from 'react-native-fs';

import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { joinFileUri } from '../helpers/joinFileUri';

export type RenameFilesParams = Pick<File, 'id' | 'name'>;

/**
 * 更新文件名称
 */
export async function renameFiles(params: RenameFilesParams) {
  const { id, name } = params;

  const oldData = await AppDataSource.manager.findOneBy(File, { id });
  const result = await AppDataSource.manager.update(File, id, { name });

  console.prettyLog(oldData)
  const oldUri = joinFileUri(oldData);
  const newUri = joinFileUri({ id, name });

  try {
    await moveFile(oldUri, newUri);
  } catch (error) {
    await AppDataSource.manager.update(File, id, { name: oldData.name });
    throw error;
  }

  return result?.generatedMaps;
}
