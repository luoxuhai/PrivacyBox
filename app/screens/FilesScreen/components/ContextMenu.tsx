import React, { ReactElement, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ContextMenuView, MenuConfig } from 'react-native-ios-context-menu';

import File from '@/database/entities/file';
import { FileTypes } from '@/database/entities/types';
import { translate } from '@/i18n';

interface ContextMenuProps {
  item: File;
  children: ReactElement;
}

export const ContextMenu = observer<ContextMenuProps>((props) => {
  const isFolder = props.item?.type === FileTypes.Folder;

  const menuConfig = useMemo<MenuConfig>(
    () => ({
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
    }),
    [isFolder],
  );

  return (
    <ContextMenuView
      menuConfig={menuConfig}
      onPressMenuPreview={() => {
        console.log('onPressMenuPreview');
      }}
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
