import { AppDataSource } from '@/database';
import File from '@/database/entities/photo';

type DeleteFilesParams = Partial<Pick<File, 'id'>>;

/**
 * 删除文件
 */
export async function deleteFiles(params: DeleteFilesParams) {
  if (!params.id) {
    throw Error('missing params.id');
  }
  const result = await AppDataSource.manager.delete(File, [params.id]);

  return result;
}
