import React, { ReactElement, useCallback, useMemo } from 'react';
import { Share } from 'react-native';
import RNShare from 'react-native-share';
import { observer } from 'mobx-react-lite';
import { ContextMenuView, MenuConfig } from 'react-native-ios-context-menu';

import { FileTypes } from '@/database/entities/types';
import { translate } from '@/i18n';
import { FetchFilesResult } from '@/services/local/file';
import { useRenameFile } from '../helpers/useRenameFile';
import { useDeleteFile } from '../helpers/useDeleteFile';

interface ContextMenuProps {
  item: FetchFilesResult;
  children: ReactElement;
  onPressMenuPreview?: () => void;
}

export const ContextMenu = observer<ContextMenuProps>((props) => {
  const isFolder = props.item?.type === FileTypes.Folder;
  const menuConfig = useMemo<MenuConfig>(() => getMenuConfig(isFolder), [isFolder]);
  const handleRenameFile = useRenameFile(props.item);
  const handleDeleteFile = useDeleteFile(props.item);

  const handlePressMenuItem = useCallback(({ nativeEvent }) => {
    switch (nativeEvent.actionKey) {
      case ContextMenuKeys.Rename:
        handleRenameFile();
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
      case ContextMenuKeys.Delete:
        handleDeleteFile();
        break;
    }
  }, []);

  return (
    <ContextMenuView
      menuConfig={menuConfig}
      onPressMenuItem={handlePressMenuItem}
      onPressMenuPreview={props.onPressMenuPreview}
    >
      {props.children}
    </ContextMenuView>
  );
});

enum ContextMenuKeys {
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
