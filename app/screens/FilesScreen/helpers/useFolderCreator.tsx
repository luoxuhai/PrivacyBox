import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StackActions } from '@react-navigation/native';

import { translate } from '@/i18n';
import { Overlay } from '@/utils';
import { fileKeys } from '../constants';
import { useStores } from '@/models';
import { createFolder, fetchFiles } from '@/services/local/file';
import { RootNavigation } from '@/navigators';
import { SheetManager } from 'react-native-actions-sheet';

export function useFolderCreator(parentId?: string | null) {
  const queryClient = useQueryClient();

  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  const { mutate: handleCreateFolder } = useMutation({
    mutationFn: async (name: string) => {
      if (name.length > 255) {
        throw Error('名称字数不能超过255个字符');
      }

      const params = {
        name,
        parent_id: parentId,
        is_fake: inFakeEnvironment,
      };

      const items = queryClient.getQueryData<FetchFilesResult[]>(
        fileKeys.list(`${inFakeEnvironment}:${parentId}`),
      );

      if (items.find((item) => item.name === params.name)) {
        throw Error('文件夹名称重复');
      }

      return await createFolder(params);
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('filesScreen.createFolder.fail'),
        message: error.message,
      });
    },
    onSuccess(data, name) {
      const id = data[0].id;
      queryClient.refetchQueries(fileKeys.list(`${inFakeEnvironment}:${parentId}`));

      const pushAction = StackActions.push('Files', { parentId: id, title: name });
      RootNavigation.dispatch(pushAction);

    },
  });

  return () => {
    Alert.prompt(
      translate('filesScreen.folderForm.title'),
      translate('filesScreen.folderForm.msg'),
      [
        {
          text: translate('common.cancel'),
          style: 'cancel',
        },
        {
          text: translate('common.confirm'),
          style: 'default',
          onPress: (value) => {
            const name = value?.trim();
            if (!name) {
              return
            }

            handleCreateFolder(name)
          },
        },
      ],
      'plain-text',
      '',
      'default',
      translate('filesScreen.rename.placeholder'),
    );
  };
}
