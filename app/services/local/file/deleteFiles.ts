import { unlink } from 'react-native-fs';

import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { FileTypes, Status } from '@/database/entities/types';
import { LocalPathManager } from '@/utils';
import { join } from '@/lib/path';

export interface DeleteFilesParams {
  items?: { id: string; type: FileTypes }[];
}

/**
 * 删除文件
 */
export async function deleteFiles(params: DeleteFilesParams) {
  if (!isValidParams(params)) {
    throw Error('invalid params');
  }

  const { items = [] } = params;
  const folders = items.filter((item) => item.type === FileTypes.Folder);
  const files = items.filter((item) => item.type !== FileTypes.Folder);

  // 删除文件类型
  if (files.length) {
    const fileIds = files.map((item) => item.id);
    await AppDataSource.manager.delete(File, fileIds);
    await removeFilesFromDisk(fileIds);
  }

  if (folders.length) {
    const ids = folders.map((item) => item.id);
    // 先删除文件夹
    await AppDataSource.manager.delete(File, ids);

    for (const id of ids) {
      const children = await AppDataSource.manager.find(File, {
        select: {
          id: true,
          type: true,
        },
        where: {
          parent_id: id,
          // 只删除正常状态的文件
          status: Status.Normal,
        },
      });
      await deleteFiles({
        items: children.map((item) => ({ id: item.id, type: item.type })),
      });
    }
  }
}

function isValidParams(params: DeleteFilesParams) {
  const items = params.items?.filter((id) => id);
  return !!items?.length;
}

async function removeFilesFromDisk(ids: string[]) {
  for (const id of ids) {
    try {
      await unlink(join(LocalPathManager.filePath, id));
    } catch (error) {
      console.error(error);
    }
  }
}
