import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { SheetManager } from 'react-native-actions-sheet';

import { PopoverMenu, MenuConfig } from '@/components/PopoverMenu';
import { HapticFeedback } from '@/utils';
import { FetchPhotosResult } from '@/services/local';
import { translate } from '@/i18n';
import { useRenamePhoto } from '../helpers/useRenamePhoto';
import { useUpdatePhoto } from '../helpers/useUpdatePhoto';

interface IContextMenuProps {
  item: FetchPhotosResult;
  disabled?: boolean;
  children?: React.ReactNode;
}

const t = translate;

export const MorePopoverMenu = observer<IContextMenuProps>((props) => {
  const menus = useMemo(() => getMenus(), []);
  const handleRenamePhoto = useRenamePhoto();
  const handleUpdatePhoto = useUpdatePhoto();

  const handleMenuItemPress = useCallback(async (key: string) => {
    switch (key) {
      case ContextMenuKeys.Rename:
        handleRenamePhoto(props.item);
        break;
      case ContextMenuKeys.Description: {
        const [isCancel, description]: [boolean, string] = await SheetManager.show(
          'description-update-sheet',
          {
            payload: {
              item: props.item,
            },
          },
        );

        if (isCancel) {
          return;
        }

        if (description === props.item.description) {
          return;
        }

        handleUpdatePhoto({ id: props.item.id, data: { description } });
      }
    }
  }, []);

  return (
    <PopoverMenu
      menus={menus}
      disabled={props.disabled}
      onPressMenuItem={(event) => {
        if (event?.nativeEvent.actionKey) {
          handleMenuItemPress(event?.nativeEvent.actionKey);
        }
      }}
      onMenuWillShow={() => {
        HapticFeedback.impact.light();
      }}
    >
      {props.children}
    </PopoverMenu>
  );
});

function getMenus(): MenuConfig {
  return {
    menuTitle: t('photoViewerScreen.bottomToolbar.moreTitle'),
    menuItems: [
      {
        actionKey: ContextMenuKeys.Description,
        actionTitle: t('photoViewerScreen.bottomToolbar.description'),
        icon: {
          iconType: 'SYSTEM',
          iconValue: 'text.bubble',
        },
      },
      {
        actionKey: ContextMenuKeys.Rename,
        actionTitle: t('common.rename'),
        icon: {
          iconType: 'SYSTEM',
          iconValue: 'pencil',
        },
      },
    ],
  };
}

enum ContextMenuKeys {
  Rename = 'rename',
  Description = 'description',
}
