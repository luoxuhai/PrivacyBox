import React, { useCallback, useContext, useMemo } from 'react';

import { Toolbar, IToolbarItem } from '@/components/Toolbar';
import { t } from '@/i18n';
import { SelectionContext } from '../context';
import { exportPhotos } from '../helpers/exportPhotos';
import { sharePhotos } from '../helpers/sharePhotos';
import { useDeletePhotos } from '../helpers/useDeletePhotos';
import { useMovePhotos } from '../helpers/movePhotos';

export function BottomToolbar() {
  const list = useMemo(getList, []);
  const selection = useContext(SelectionContext);
  const albumId = selection.items?.[0]?.parent_id;

  const deletePhotos = useDeletePhotos(albumId);
  const movePhotos = useMovePhotos(albumId);

  const handlePressItem = useCallback(
    async (key: BottomToolbarKeys) => {
      const uris = selection.items.map((item) => item.uri);
      const ids = selection.items.map((item) => item.id);

      switch (key) {
        case BottomToolbarKeys.Share:
          await sharePhotos({ uris });
          break;
        case BottomToolbarKeys.SaveToLocal:
          await exportPhotos(uris);
          break;
        case BottomToolbarKeys.Delete:
          deletePhotos({ ids });
          break;
        case BottomToolbarKeys.Move:
          await movePhotos(ids);
          break;
      }
    },
    [selection],
  );

  return (
    <Toolbar
      visible={selection.enabled}
      disabled={!selection.items.length}
      list={list}
      onPress={handlePressItem}
    />
  );
}

function getList(): IToolbarItem[] {
  return [
    {
      title: t('common.share'),
      key: BottomToolbarKeys.Share,
      icon: 'square.and.arrow.up',
    },
    {
      title: t('filesScreen.saveToLocal'),
      key: BottomToolbarKeys.SaveToLocal,
      icon: 'square.and.arrow.down',
    },
    {
      title: t('photosScreen.moveToAlbum'),
      key: BottomToolbarKeys.Move,
      icon: 'photo.on.rectangle.angled',
    },
    {
      title: t('common.delete'),
      key: BottomToolbarKeys.Delete,
      icon: 'trash',
    },
  ];
}

enum BottomToolbarKeys {
  Share = 'share',
  Move = 'move',
  SaveToLocal = 'save-to-local',
  Delete = 'delete',
}
