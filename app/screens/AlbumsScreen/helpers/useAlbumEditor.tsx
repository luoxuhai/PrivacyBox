import { t } from '@/i18n';
import Photo from '@/database/entities/photo';
import { useDeleteAlbum } from './useDeleteAlbum';
import { useRenameAlbum } from './useRenameAlbum';
import { showActionSheet } from '@/utils';

export function useAlbumEditor() {
  const handleDeleteAlbum = useDeleteAlbum();
  const handleRenameAlbum = useRenameAlbum();

  function onOpenActionSheet(item: Photo) {
    showActionSheet(
      {
        options: [
          t('common.cancel'),
          t('albumsScreen.editAlbum.changeName'),
          t('albumsScreen.editAlbum.delete'),
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
        title: t('albumsScreen.editAlbum.title'),
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 1:
            handleRenameAlbum(item);
            break;
          case 2:
            handleDeleteAlbum(item);
            break;
        }
      },
    );
  }

  return {
    onOpenActionSheet,
  };
}
