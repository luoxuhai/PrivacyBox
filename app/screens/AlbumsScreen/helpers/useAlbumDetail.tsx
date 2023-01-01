import { useQuery } from '@tanstack/react-query';

import { albumKeys } from '../constants';
import { fetchAlbumDetail } from '@/services/local';
import { Status } from '@/database/entities/types';

export function useAlbumDetail(id: string) {
  if (!id) {
    return null;
  }

  const query = useQuery({
    queryKey: albumKeys.detail(id),
    queryFn: () => fetchAlbumDetail({ id, status: Status.Normal }),
    enabled: true,
  });

  return query;
}
