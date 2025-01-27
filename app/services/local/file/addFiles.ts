import { mkdir, moveFile } from 'react-native-fs';

import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import * as path from '@/lib/path';
import { generateUUID, LocalPathManager, reportException } from '@/utils';
import { getFileTypeByMime } from '@/utils/getFileTypeByMime';

interface FileSource {
  name: string;
  uri: string;
  size: number;
  mime: string;
  // 相册文件专属
  localIdentifier?: string;
}

type AddFilesParams = {
  parent_id: string | null;
  is_fake: boolean;
  files: FileSource[];
};

/**
 * 删除文件
 */
export async function addFiles(params: AddFilesParams) {
  if (!isValidParams(params)) {
    throw Error('invalid params');
  }

  const { parent_id, is_fake = false } = params;

  for (const file of params.files) {
    try {
      const { name, size, mime, localIdentifier } = file;
      // 文件主键
      const id = generateUUID();

      // 文件存放目录
      const destDir = path.join(LocalPathManager.filePath, id);
      await mkdir(destDir, { NSURLIsExcludedFromBackupKey: true });

      // 最终的文件地址
      const uri = path.join(destDir, name);
      await moveFile(file.uri, uri);

      // 文件类型
      const type = getFileTypeByMime(mime);

      const data = {
        id,
        parent_id,
        name,
        size,
        mime,
        uri,
        is_fake,
        type,
        metadata: {
          localIdentifier,
        },
      };
      await AppDataSource.manager.insert(File, data);
    } catch (error) {
      reportException({ error, message: '添加文件出错', level: 'fatal' });
      throw error;
    }
  }
}

function isValidParams(params: AddFilesParams) {
  return params.files.length;
}
