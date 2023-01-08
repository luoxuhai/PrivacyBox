import Photo from '@/database/entities/photo';
import { Status } from '@/database/entities/types';
import { fetchPhotos, FetchPhotosResult } from './fetchPhotos';

export type RecoverDeletedPhotosParams = {
  ids?: string[];
  is_all?: boolean;
  target_id: string;
};

export type DestroyDeletedPhotosParams = {
  ids?: string[];
  is_all?: boolean;
};

export async function recoverDeletedPhotos(params: RecoverDeletedPhotosParams) {
  const { ids, isAll } = params;

  const order: OrderBy<Partial<Photo>> = {
    deleted_date: 'DESC',
  };

  return 'result';
}

export async function destroyDeletedPhotos(params: DestroyDeletedPhotosParams) {}
