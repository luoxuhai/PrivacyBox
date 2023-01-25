import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { FileTypes } from '@/database/entities/types';
import { generateUUID } from '@/utils';

type CreateFolderParams = Partial<Pick<File, 'id' | 'name' | 'is_fake' | 'parent_id'>>;

/**
 * 创建文件夹
 */
export async function createFolder(params: CreateFolderParams) {
  const { id, parent_id, name, is_fake } = params;

  const result = await AppDataSource.manager.insert(File, {
    id: id || generateUUID(),
    is_fake,
    name,
    parent_id,
    type: FileTypes.Folder,
  });

  return result?.generatedMaps;
}
