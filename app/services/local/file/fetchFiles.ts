import { AppDataSource } from '@/database';
import File from '@/database/entities/file';
import { FileTypes } from '@/database/entities/types';

type FetchFilesParams = Partial<Pick<File, 'name' | 'status' | 'is_fake' | 'parent_id'>>;

export type FetchFilesResult = File & {
  item_count: number;
};

export async function fetchFiles(params: FetchFilesParams): Promise<FetchFilesResult[]> {
  const result = (await AppDataSource.manager.find(File, {
    where: {
      ...params,
    },
  })) as FetchFilesResult[];

  for (const item of result) {
    item.item_count = await fetchItemCount(item.id);
  }

  return result;
}

async function fetchItemCount(id: string) {
  const count = await AppDataSource.manager.count(File, {
    where: { parent_id: id },
  });

  return count;
}
