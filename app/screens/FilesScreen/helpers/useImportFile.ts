import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { t } from '@/i18n';
import { fileKeys } from '../constants';
import { useStores } from '@/models';
import { addFiles } from '@/services/local/file';
import { IResult } from './FileImporter';
import { useRef } from 'react';

export function useImportFile(folderId: string) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const timer = useRef<NodeJS.Timeout>();

  const { mutate: handleImportFile } = useMutation({
    mutationFn: async (files?: IResult[] | void) => {
      if (!files) {
        return;
      }

      timer.current = setTimeout(() => {
        Overlay.alert({
          preset: 'spinner',
          duration: 0,
          title: t('filesScreen.import.doing'),
        });
      }, 1000);

      console.prettyLog(files);

      await addFiles({
        parent_id: folderId,
        is_fake: inFakeEnvironment,
        files,
      });
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: t('filesScreen.import.fail'),
        message: error.message,
      });
    },
    onSuccess() {
      queryClient.refetchQueries(fileKeys.list(`${inFakeEnvironment}:${folderId}`));
      Overlay.toast({
        preset: 'done',
        title: t('filesScreen.import.success'),
      });
    },
    onSettled() {
      clearTimeout(timer.current);
    },
  });

  return handleImportFile;
}
