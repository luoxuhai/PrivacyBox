import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { cloneDeep } from 'lodash';

import { PopoverMenu, MenuConfig } from '@/components/PopoverMenu';
import { HapticFeedback } from '@/utils';
import { extname } from '@/lib/path';
import { FetchPhotosResult } from '@/services/local';
import { translate } from '@/i18n';

interface IContextMenuProps {
  item: FetchPhotosResult;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange?: (value: any) => void;
}

const t = translate;

export const MorePopoverMenu = observer<IContextMenuProps>((props) => {
  const menus = useMemo(() => getMenus(), []);

  function setCurrentFile(values: any) {
    const newImage = cloneDeep(props.images);
    for (const [index, item] of newImage.entries()) {
      if (item.id === props.item.id) {
        newImage[index] = {
          ...item,
          ...values,
        };
        break;
      }
    }

    return newImage;
  }

  const handleMenuItemPress = useCallback((key: string) => {
    switch (key) {
      case 'rename':
        Alert.prompt(
          t('filesScreen.rename'),
          undefined,
          [
            {
              text: t('common:cancel'),
              style: 'cancel',
            },
            {
              text: t('common:confirm'),
              async onPress(value: string | undefined) {
                const name = value?.trim();
                if (!name || name === props.item.name) return;

                const fullName = `${name}${extname(props.item.name)}`;
                const sourceId = props.item.extra?.source_id as string;
                // await updateFile({
                //   where: {
                //     id: props.item.id,
                //   },
                //   data: {
                //     name: fullName,
                //   },
                // });
                // FS.moveFile(props.item.uri as string, getSourcePath(sourceId, fullName));

                props.onChange?.(
                  setCurrentFile({
                    name: fullName,
                  }),
                );
              },
            },
          ],
          'plain-text',
          props.item.name.replace(/\..+$/, ''),
        );
        break;
      case 'description':
      // services.nav.screens?.show('DescriptionForm', {
      //   item: props.item,
      //   async onDone(value?: string) {
      //     await updateFile({
      //       where: {
      //         id: props.item.id,
      //       },
      //       data: {
      //         description: value,
      //       },
      //     });
      //     props.onChange?.(
      //       setCurrentFile({
      //         description: value,
      //       }),
      //     );
      //   },
      // });
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
        actionKey: 'description',
        actionTitle: t('photoViewerScreen.bottomToolbar.description'),
        icon: {
          iconType: 'SYSTEM',
          iconValue: 'text.bubble',
        },
      },
      {
        actionKey: 'rename',
        actionTitle: t('common.rename'),
        icon: {
          iconType: 'SYSTEM',
          iconValue: 'pencil',
        },
      },
    ],
  };
}
