import { useQuery } from '@tanstack/react-query';

import { albumKeys } from '@/screens/AlbumsScreen/constants';
import { fetchAlbumDetail } from '@/services/local';

export function useAlbumDetail(id: string) {
  if (!id) {
    return null;
  }

  const query = useQuery({
    queryKey: albumKeys.detail(id),
    queryFn: fetchAlbumDetail,
    enabled: true,
  });

  return query;
}
