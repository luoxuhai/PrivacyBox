import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAssetsAsync } from 'expo-media-library';

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
    settingsStore: { autoDeleteOriginEnabled },
  } = useStores();
  const { mutate: handleImportFile } = useMutation({
    mutationFn: async (photos?: PhotoImporterResult[]) => {
      if (!photos) {
        return [];
      }

      return await addPhotos({
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
    onSuccess(importedPhotos) {
      Overlay.toast({
        preset: 'done',
        title: translate('filesScreen.rename.success'),
      });
      queryClient.refetchQueries(photoKeys.list(`${inFakeEnvironment}:${albumId}`));
      queryClient.refetchQueries(albumKeys.detail(albumId));

      if (autoDeleteOriginEnabled) {
        const localIdentifiers = importedPhotos
          .map((item) => item.localIdentifier)
          .filter((item) => item);
        deleteAssetsAsync(localIdentifiers);
      }
    },
  });

  return handleImportFile;
}
