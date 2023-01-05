import React, { useCallback, useContext, useMemo } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MenuConfig, OnPressMenuItemEventObject } from 'react-native-ios-context-menu';
import { SFSymbol } from 'react-native-sfsymbols';

import { spacing } from '@/theme';
import { PopoverMenu } from '@/components';
import { translate } from '@/i18n';
import { PhotoSettingsContext, PhotoSettingsContextValue } from '../context';

interface MoreButtonProps {
  onSort?: (value: PhotoSettingsContextValue) => void;
  onSelect?: () => void;
}

export function MoreButton(props: MoreButtonProps) {
  const photoSettingsContext = useContext(PhotoSettingsContext);
  const menuConfig = useMemo<MenuConfig>(
    () => getMenuConfig(photoSettingsContext),
    [photoSettingsContext.orderBy],
  );

  function handlePressMenuItem(event?: OnPressMenuItemEventObject) {
    const item = event?.nativeEvent;

    switch (item.actionKey) {
      case MoreButtonMenuKeys.Select:
        props.onSelect?.();
        break;
      case MoreButtonMenuKeys.SortCtime:
      case MoreButtonMenuKeys.SortName:
      case MoreButtonMenuKeys.SortSize:
        props.onSort?.({
          orderBy: {
            [item.actionKey]:
              photoSettingsContext.orderBy[item.actionKey] === 'ASC' ? 'DESC' : 'ASC',
          },
        });

        break;
    }
  }

  return (
    <PopoverMenu menus={menuConfig} onPressMenuItem={handlePressMenuItem}>
      <SFSymbol style={$icon} size={24} name="ellipsis.circle" />
    </PopoverMenu>
  );
}

enum MoreButtonMenuKeys {
  Select = 'select',
  SortSize = 'size',
  SortName = 'name',
  SortCtime = 'created_date',
}

function getMenuConfig(photoSettings: PhotoSettingsContextValue): MenuConfig {
  return {
    menuTitle: '',
    menuItems: [
      {
        menuTitle: '',
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: MoreButtonMenuKeys.Select,
            actionTitle: translate('filesScreen.select'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'checkmark.circle',
            },
          },
        ].filter((item) => item),
      },
      {
        menuTitle: translate('filesScreen.sort'),
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: MoreButtonMenuKeys.SortCtime,
            actionTitle: translate('filesScreen.sortCtime'),
          },
          {
            actionKey: MoreButtonMenuKeys.SortName,
            actionTitle: translate('filesScreen.sortName'),
          },
          {
            actionKey: MoreButtonMenuKeys.SortSize,
            actionTitle: translate('filesScreen.sortSize'),
          },
        ].map((item) => ({
          ...item,
          ...getSortIconObject(photoSettings.orderBy[item.actionKey]),
          menuState: photoSettings.orderBy[item.actionKey] ? 'on' : 'off',
        })),
      },
    ].filter((item) => item),
  };
}

function getSortIconObject(sort: 'DESC' | 'ASC') {
  return sort
    ? {
        icon: {
          iconType: 'SYSTEM',
          iconValue: sort === 'ASC' ? 'chevron.up' : 'chevron.down',
        },
      }
    : {};
}

const $icon: ViewStyle = {
  width: 34,
  height: 34,
};
