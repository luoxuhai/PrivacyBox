import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';

export type UpdatePhotoParams = {
  id: string;
  data: Pick<Photo, 'description'>;
};

export async function updatePhoto(params: UpdatePhotoParams) {
  const { id, data } = params;

  const result = await AppDataSource.manager.update(Photo, id, data);

  return result;
}
