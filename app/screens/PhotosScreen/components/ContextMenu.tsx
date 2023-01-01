import React, { ReactElement, useCallback, useMemo } from 'react';
import { Share } from 'react-native';
import RNShare from 'react-native-share';
import { observer } from 'mobx-react-lite';
import { ContextMenuView, MenuConfig } from 'react-native-ios-context-menu';
import { SheetManager } from 'react-native-actions-sheet';

import { FileTypes } from '@/database/entities/types';
import { translate } from '@/i18n';
import { FetchFilesResult } from '@/services/local/file';

interface ContextMenuProps {
  item: FetchFilesResult;
  children: ReactElement;
}

export const ContextMenu = observer<ContextMenuProps>((props) => {
  const isFolder = props.item?.type === FileTypes.Folder;
  const menuConfig = useMemo<MenuConfig>(() => getMenuConfig(isFolder), [isFolder]);

  const handlePressMenuItem = useCallback(({ nativeEvent }) => {
    switch (nativeEvent.actionKey) {
      case ContextMenuKeys.Details:
        SheetManager.show('file-detail-sheet', {
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
        RNShare.open({
          url: props.item.uri,
          saveToFiles: true,
        });
        break;
    }
  }, []);

  return (
    <ContextMenuView menuConfig={menuConfig} onPressMenuItem={handlePressMenuItem}>
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

function getMenuConfig(isFolder: boolean): MenuConfig {
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
          !isFolder && {
            actionKey: ContextMenuKeys.Share,
            actionTitle: translate('common.share'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'square.and.arrow.up',
            },
          },
          !isFolder && {
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
