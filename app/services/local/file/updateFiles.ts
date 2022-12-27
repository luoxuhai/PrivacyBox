import { AppDataSource } from '@/database';
import File from '@/database/entities/file';

interface UpdateFilesParams {
  id?: string;
  ids?: string[];
  where?: Partial<File>;
  data: Partial<Pick<File, 'name' | 'is_fake' | 'status'>>;
}

/**
 * 更新文件
 */
export async function updateFiles(params: UpdateFilesParams) {
  const result = await AppDataSource.manager.update(File, getCriteria(params), params.data);
  return result?.generatedMaps;
}

export function getCriteria(params: UpdateFilesParams) {
  return params.id || params.ids || params.where;
}
