import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAssetsAsync } from 'expo-media-library';

import { Overlay } from '@/utils';
import { t } from '@/i18n';
import { photoKeys } from '../constants';
import { useStores } from '@/models';
import { PhotoImporterResult } from './PhotoImporter';
import { addPhotos } from '@/services/local';
import { albumKeys } from '@/screens/AlbumsScreen/constants';
import { classifyImageTask } from '@/utils/task/classifyImageTask';

export function useImportPhotos(queryKey: ReturnType<typeof photoKeys.list>) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
    settingsStore: { autoDeleteOriginEnabled, smartSearchEnabled },
  } = useStores();

  const [_k1, _k2, { filter: albumId }] = queryKey;

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
        title: t('filesScreen.import.fail'),
        message: error.message,
      });
    },
    async onSuccess(importedPhotos) {
      Overlay.toast({
        preset: 'done',
        title: t('filesScreen.import.success'),
      });

      queryClient.refetchQueries(queryKey);
      queryClient.refetchQueries(albumKeys.detail(albumId));

      setTimeout(async () => {
        if (autoDeleteOriginEnabled) {
          const localIdentifiers = importedPhotos
            .map((item) => item.localIdentifier)
            .filter((item) => item);

          try {
            global.isPausePresentMask = true;
            await deleteAssetsAsync(localIdentifiers);
          } catch {
          } finally {
            global.isPausePresentMask = false;
          }
        }
        if (smartSearchEnabled) {
          classifyImageTask.start();
        }
      }, 500);
    },
  });

  return handleImportFile;
}
