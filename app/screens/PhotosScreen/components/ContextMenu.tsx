import React, { ReactElement, useCallback, useMemo } from 'react';
import { Share } from 'react-native';
import { observer } from 'mobx-react-lite';
import { ContextMenuView, MenuConfig } from 'react-native-ios-context-menu';
import { SheetManager } from 'react-native-actions-sheet';

import { PhotoTypes } from '@/database/entities/types';
import { translate } from '@/i18n';
import { FetchPhotosResult } from '@/services/local';
import { exportPhotos } from '../helpers/exportPhotos';

interface ContextMenuProps {
  item: FetchPhotosResult;
  children: ReactElement;
}

export const ContextMenu = observer<ContextMenuProps>((props) => {
  const menuConfig = useMemo<MenuConfig>(() => getMenuConfig(), []);

  const handlePressMenuItem = useCallback(({ nativeEvent }) => {
    switch (nativeEvent.actionKey) {
      case ContextMenuKeys.Details:
        SheetManager.show('photo-detail-sheet', {
          payload: {
            item: props.item,
          },
        });
        break;
      case ContextMenuKeys.Share:
        Share.share({
          url: props.item.uri,
        });
        break;
      case ContextMenuKeys.SaveToLocal:
        exportPhotos([props.item.uri]);
        break;
    }
  }, []);

  return (
    <ContextMenuView
      style={{ flex: 1 }}
      menuConfig={menuConfig}
      onPressMenuItem={handlePressMenuItem}
    >
      {props.children}
    </ContextMenuView>
  );
});

enum ContextMenuKeys {
  Details = 'details',
  Share = 'share',
  Rename = 'rename',
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
            actionKey: ContextMenuKeys.Rename,
            actionTitle: translate('common.rename'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'pencil',
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
