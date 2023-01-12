import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Overlay } from '@/utils';
import { translate } from '@/i18n';
import { fileKeys } from '../constants';
import { useStores } from '@/models';
import { FetchFilesResult, renameFiles, RenameFilesParams } from '@/services/local/file';
import { extname } from '@/lib/path';

export function useRenameFile(parentId: string) {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutateAsync: handleRename } = useMutation({
    mutationFn: async (params: RenameFilesParams) => {
      const items = queryClient.getQueryData<FetchFilesResult[]>(
        fileKeys.list(`${inFakeEnvironment}:${parentId}`),
      );

      if (items.find((item) => item.name === params.name)) {
        throw Error('文件名称重复');
      }

      await renameFiles(params);
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('filesScreen.rename.fail'),
        message: error.message,
      });
    },
    onSuccess(_, { id, name }) {
      queryClient.setQueryData<FetchFilesResult[]>(
        fileKeys.list(`${inFakeEnvironment}:${parentId}`),
        (oldData) =>
          oldData.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                name,
              };
            } else {
              return item;
            }
          }),
      );
    },
  });

  function handlePresentRenamePrompt(params: RenameFilesParams) {
    Alert.prompt(
      translate('common.rename'),
      undefined,
      (value: string) => {
        const name = value.trim();
        if (!name || name === params.name) {
          return;
        }

        const newName = `${name}${extname(params.name)}`;
        if (newName === params.name) {
          return;
        }

        handleRename({ ...params, name: newName });
      },
      'plain-text',
      params.name.replace(/\..+$/, ''),
      'default',
      translate('filesScreen.folderForm.placeholder'),
    );
  }

  return handlePresentRenamePrompt;
}
