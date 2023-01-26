import { Not } from 'typeorm';
import { exists } from 'react-native-fs';

import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { FetchFilesResult } from '@/services/local';
import { joinFileUri } from '@/services/local/helpers/joinFileUri';
import { FileTypes } from '@/database/entities/types';

export async function fetchAllFileUris() {
  const files = (await AppDataSource.manager.find(File, {
    select: {
      id: true,
      name: true,
    },
    where: {
      type: Not(FileTypes.Folder),
    },
  })) as FetchFilesResult[];

  const uris: string[] = [];
  for (const file of files) {
    const uri = joinFileUri(file);
    if (await exists(uri)) {
      uris.push(uri);
    }
  }

  return uris;
}
