import { AppDataSource } from '@/database';
import File from '@/database/entities/file';

interface UpdateFilesParams {
  id: string;
  data: Partial<Pick<File, 'name' | 'is_fake'>>;
}

/**
 * 更新相册
 */
export async function updateFiles(params: UpdateFilesParams) {
  const result = await AppDataSource.manager.update(File, params.id, params.data);
  return result?.generatedMaps;
}
