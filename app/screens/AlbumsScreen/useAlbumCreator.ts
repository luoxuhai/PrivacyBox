import { Alert } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createAlbum } from '@/services/local';
import { Overlay } from '@/utils';
import { albumKeys } from './constants';
import { useStores } from '@/models';

export function useAlbumCreator() {
  const queryClient = useQueryClient();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();
  const { mutate: handleCreateAlbum } = useMutation({
    mutationFn: async (text: string) => {
      const name = text.trim();
      if (!name) {
        throw Error('缺少 name');
      }
      await createAlbum({
        name,
      });
    },
    onError() {
      Overlay.toast({
        preset: 'error',
        title: '相册名称（10个字符内）',
      });
    },
    onSuccess() {
      queryClient.refetchQueries(albumKeys.list(`${inFakeEnvironment}`));
      Overlay.toast({
        preset: 'done',
        title: 'xx',
      });
    },
  });

  function openAlert() {
    Alert.prompt(
      '新建相册',
      '请输入相册名称',
      handleCreateAlbum,
      'plain-text',
      '',
      'default',
      '相册名称（10个字符内）',
    );
  }

  return { openAlert };
}
