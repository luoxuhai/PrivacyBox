import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { Status } from '@/database/entities/types';

interface DeleteFilesParams {
  id?: string;
  ids?: string[];
}

/**
 * 删除文件
 */
export async function deleteFiles(params: DeleteFilesParams) {
  if (!isValidParams(params)) {
    throw Error('invalid params');
  }

  const result = await AppDataSource.manager.delete(File, getCriteria(params));
  await AppDataSource.manager.delete(File, {
    parent_id: params.id,
  });
  return result;
}

/**
 * 软删除文件
 */
export async function softDeleteFiles(params: DeleteFilesParams) {
  if (!isValidParams(params)) {
    throw Error('invalid params');
  }

  const result = await AppDataSource.manager.update(File, getCriteria(params), {
    status: Status.Deleted,
  });

  return result;
}

function isValidParams(params: DeleteFilesParams) {
  const ids = params.ids?.filter((id) => id);

  return params.id || ids?.length;
}

function getCriteria(params: DeleteFilesParams) {
  return params.id ?? params.ids;
}
