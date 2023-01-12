import { IsNull } from 'typeorm';

import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { FileTypes, Status } from '@/database/entities/types';
import { joinFileUri } from '../helpers/joinFileUri';

type FetchFilesParams = Partial<Pick<File, 'name' | 'status' | 'is_fake' | 'parent_id' | 'id'>>;

export type FetchFilesResult = File & {
  item_count: number;
  uri?: string;
};

export async function fetchFiles(params: FetchFilesParams): Promise<FetchFilesResult[]> {
  const result = (await AppDataSource.manager.find(File, {
    where: {
      ...params,
      parent_id: params.parent_id ?? IsNull(),
      status: Status.Normal,
    },
    order: {
      type: 'ASC',
    },
  })) as FetchFilesResult[];

  for (const item of result) {
    if (item.type === FileTypes.Folder) {
      item.item_count = await fetchItemCount(item.id);
    } else {
      item.uri = joinFileUri(item);
    }
  }

  return result;
}

async function fetchItemCount(id: string) {
  const count = await AppDataSource.manager.count(File, {
    where: { parent_id: id, status: Status.Normal },
  });

  return count;
}
