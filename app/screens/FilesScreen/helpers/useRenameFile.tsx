import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { translate } from '@/i18n';
import { fileKeys } from '../constants';
import Photo from '@/database/entities/photo';
import { useStores } from '@/models';
import { FetchFilesResult, updateFiles, fetchFiles } from '@/services/local/file';

export function useRenameFile(item: FetchFilesResult) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutate: handleRename } = useMutation({
    mutationFn: async (params: { id: string; data: Partial<Photo> }) => {
      if (!params.id || !params.data.name) {
        throw Error('');
      }

      const exists = !!(
        await fetchFiles({
          name: params.data.name,
        })
      ).length;

      if (exists) {
        throw Error('相册名称不能相同');
      }

      await updateFiles(params);
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('filesScreen.rename.fail'),
        message: error.message,
      });
    },
    onSuccess() {
      console.log('item.parent_id', item.parent_id);
      queryClient.refetchQueries(fileKeys.list(`${inFakeEnvironment}:${item.parent_id}`));
      Overlay.toast({
        preset: 'done',
        title: translate('filesScreen.rename.success'),
      });
    },
  });

  function handlePresentRenamePrompt() {
    Alert.prompt(
      translate('filesScreen.folderForm.title'),
      translate('filesScreen.folderForm.msg'),
      (name: string) => {
        handleRename({
          id: item.id,
          data: {
            name: name.trim(),
          },
        });
      },
      'plain-text',
      item.name,
      'default',
      translate('filesScreen.folderForm.placeholder'),
    );
  }

  return handlePresentRenamePrompt;
}
