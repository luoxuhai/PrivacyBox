import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StackActions, useNavigation } from '@react-navigation/native';

import { translate } from '@/i18n';
import { Overlay } from '@/utils';
import { fileKeys } from '../constants';
import { useStores } from '@/models';
import { createFolder, fetchFiles } from '@/services/local/file';
import { RootNavigation } from '@/navigators';

export function useFolderCreator(parentId?: string | null) {
  const queryClient = useQueryClient();

  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  const { mutate: handleCreateFolder } = useMutation({
    mutationFn: async (text?: string) => {
      const name = text?.trim();
      if (!name) {
        throw Error('缺少 name');
      }

      const params = {
        name,
        parent_id: parentId,
        is_fake: inFakeEnvironment,
      };

      const exists = !!(await fetchFiles(params)).length;

      if (exists) {
        throw Error('文件夹名称不能相同');
      }

      return await createFolder(params);
    },
    onError(error: Error) {
      Overlay.toast({
        preset: 'error',
        title: translate('albumsScreen.createAlbum.fail'),
        message: error.message,
      });
    },
    onSuccess(data) {
      const id = data[0].id;
      const pushAction = StackActions.push('Files', { parentId: id, title: 'xxx' });
      RootNavigation.dispatch(pushAction);

      queryClient.refetchQueries(fileKeys.list(`${inFakeEnvironment}:${id}`));
      Overlay.toast({
        preset: 'done',
        title: translate('albumsScreen.createAlbum.success'),
      });
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
          onPress: handleCreateFolder,
        },
      ],
      'plain-text',
      '',
      'default',
      translate('filesScreen.folderForm.placeholder'),
    );
  };
}
