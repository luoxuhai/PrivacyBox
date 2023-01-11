import React, { ReactElement, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ContextMenuView, MenuConfig } from 'react-native-ios-context-menu';
import { SheetManager } from 'react-native-actions-sheet';

import { translate } from '@/i18n';
import { FetchPhotosResult } from '@/services/local';
import { exportPhotos } from '../helpers/exportPhotos';
import { sharePhotos } from '../helpers/sharePhotos';
import { useDeletePhotos } from '../helpers/useDeletePhotos';
import { useMovePhotos } from '../helpers/useMovePhotos';

interface ContextMenuProps {
  item: FetchPhotosResult;
  disabled?: boolean;
  children?: ReactElement | ReactElement[];
}

export const ContextMenu = observer<ContextMenuProps>((props) => {
  const { item } = props;
  const menuConfig = useMemo<MenuConfig>(() => getMenuConfig(), []);
  const deletePhotos = useDeletePhotos();
  const movePhotos = useMovePhotos();

  const handlePressMenuItem = useCallback(
    ({ nativeEvent }) => {
      switch (nativeEvent.actionKey) {
        case ContextMenuKeys.Details:
          SheetManager.show('photo-detail-sheet', {
            payload: {
              item,
            },
          });
          break;
        case ContextMenuKeys.Share:
          sharePhotos({ uri: item.uri });
          break;
        case ContextMenuKeys.SaveToLocal:
          exportPhotos([item.uri]);
          break;
        case ContextMenuKeys.Delete:
          deletePhotos({ ids: [item.id] });
          break;
        case ContextMenuKeys.Move:
          movePhotos([item.id]);
          break;
      }
    },
    [item],
  );

  return (
    <ContextMenuView
      style={{ flex: 1 }}
      menuConfig={menuConfig}
      isContextMenuEnabled={!props.disabled}
      onPressMenuItem={handlePressMenuItem}
    >
      {props.children}
    </ContextMenuView>
  );
});

enum ContextMenuKeys {
  Details = 'details',
  Share = 'share',
  Move = 'move',
  SaveToLocal = 'save-to-local',
  Delete = 'delete',
}

function getMenuConfig(): MenuConfig {
  return {
    menuTitle: '',
    menuItems: [
      {
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: ContextMenuKeys.Details,
            actionTitle: translate('filesScreen.detail.title'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'info.circle',
            },
          },
          {
            actionKey: ContextMenuKeys.Share,
            actionTitle: translate('common.share'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'square.and.arrow.up',
            },
          },
          {
            actionKey: ContextMenuKeys.Move,
            actionTitle: translate('photosScreen.moveToAlbum'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'photo.on.rectangle.angled',
            },
          },
          {
            actionKey: ContextMenuKeys.SaveToLocal,
            actionTitle: translate('filesScreen.saveToLocal'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'square.and.arrow.down',
            },
          },
        ].filter((item) => item),
      },
      {
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: ContextMenuKeys.Delete,
            actionTitle: translate('common.delete'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'trash',
            },
            menuAttributes: ['destructive'],
          },
        ],
      },
    ].filter((item) => item),
  };
}
