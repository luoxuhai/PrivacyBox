import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { translate } from '@/i18n';
import { fileKeys } from '../constants';
import { useStores } from '@/models';
import { addFiles } from '@/services/local/file';
import { IResult } from './FileImporter';

export function useImportFile(folderId: string) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutate: handleImportFile } = useMutation({
    mutationFn: async (files?: IResult[] | void) => {
      if (!files) {
        return;
      }

      console.prettyLog(files)

      await addFiles({
        parent_id: folderId,
        is_fake: inFakeEnvironment,
        files,
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
      queryClient.refetchQueries(fileKeys.list(`${inFakeEnvironment}:${folderId}`));
      Overlay.toast({
        preset: 'done',
        title: translate('filesScreen.rename.success'),
      });
    },
  });

  return handleImportFile;
}
