import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { translate } from '@/i18n';
import { fileKeys } from '../constants';
import Photo from '@/database/entities/photo';
import { useStores } from '@/models';
import { FetchFilesResult, updateFiles, fetchFiles } from '@/services/local/file';
import { IResult } from './FileImporter';

export function useImportFile(folderId: string) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutate: handleImportFile } = useMutation({
    mutationFn: async (files?: IResult[] | void) => {
      await updateFiles(files);
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
