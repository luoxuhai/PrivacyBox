import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { FileTypes } from '@/database/entities/types';
import { generateUUID } from '@/utils';

type CreateFolderParams = Partial<Pick<File, 'name' | 'is_fake' | 'parent_id'>>;

/**
 * 创建文件夹
 */
export async function createFolder(params: CreateFolderParams) {
  const result = await AppDataSource.manager.insert(File, {
    id: generateUUID(),
    is_fake: params.is_fake,
    name: params.name,
    parent_id: params.parent_id,
    type: FileTypes.Folder,
  });

  return result?.generatedMaps;
}
