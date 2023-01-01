import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { translate } from '@/i18n';
import { photoKeys } from '../constants';
import { useStores } from '@/models';
import { PhotoImporterResult } from './PhotoImporter';
import { addPhotos } from '@/services/local';
import { albumKeys } from '@/screens/AlbumsScreen/constants';

export function useImportPhotos(albumId: string) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutate: handleImportFile } = useMutation({
    mutationFn: async (photos?: PhotoImporterResult[] | void) => {
      if (!photos) {
        return;
      }

      await addPhotos({
        album_id: albumId,
        is_fake: inFakeEnvironment,
        photos,
      });
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('filesScreen.rename.fail'),
        message: error.message,
      });
    },
    onSuccess() {
      queryClient.refetchQueries(photoKeys.list(`${inFakeEnvironment}:${albumId}`));
      queryClient.refetchQueries(albumKeys.detail(albumId));
      Overlay.toast({
        preset: 'done',
        title: translate('filesScreen.rename.success'),
      });
    },
  });

  return handleImportFile;
}
