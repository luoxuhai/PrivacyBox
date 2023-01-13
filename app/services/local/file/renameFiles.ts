import { moveFile } from 'react-native-fs';

import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { joinFileUri } from '../helpers/joinFileUri';
import { FileTypes } from '@/database/entities/types';

export type RenameFilesParams = Pick<File, 'id' | 'name' | 'type'>;

/**
 * 更新文件名称
 */
export async function renameFiles(params: RenameFilesParams) {
  const { id, name, type } = params;

  const oldData = await AppDataSource.manager.findOneBy(File, { id });
  const result = await AppDataSource.manager.update(File, id, { name });

  if (type === FileTypes.Folder) {
    return result?.generatedMaps;
  }

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
