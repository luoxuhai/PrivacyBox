import File from '@/database/entities/file';

type RestoreFilesParams = {
  ids: File['id'][];
};

/**
 * 恢复软删除的文件
 */
export async function restoreFiles(params: RestoreFilesParams) {
  console.log(params);
}
