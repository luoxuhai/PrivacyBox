import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MenuConfig } from 'react-native-ios-context-menu';
import { SFSymbol } from 'react-native-sfsymbols';

import { spacing } from '@/theme';
import { PopoverMenu } from '@/components';
import { translate } from '@/i18n';

interface MoreButtonProps {}

export function MoreButton(props: MoreButtonProps) {
  const menuConfig = useMemo<MenuConfig>(() => getMenuConfig(), []);

  return (
    <PopoverMenu menus={menuConfig}>
      <SFSymbol style={$icon} size={24} name="ellipsis.circle" />
    </PopoverMenu>
  );
}

enum MoreButtonMenuKeys {
  Select = 'select',
  SortSize = 'sort-size',
  SortName = 'sort-name',
  SortCtime = 'sort-ctime',
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
            actionKey: MoreButtonMenuKeys.Select,
            actionTitle: translate('filesScreen.detail.title'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'info.circle',
            },
          },
        ].filter((item) => item),
      },
      {
        menuTitle: '排序',
        menuOptions: ['displayInline'],
        menuItems: [
          {
            actionKey: MoreButtonMenuKeys.SortCtime,
            actionTitle: translate('common.share'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'square.and.arrow.up',
            },
          },
          {
            actionKey: MoreButtonMenuKeys.SortName,
            actionTitle: translate('filesScreen.move'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'photo.on.rectangle.angled',
            },
          },
          {
            actionKey: MoreButtonMenuKeys.SortSize,
            actionTitle: translate('filesScreen.saveToLocal'),
            icon: {
              iconType: 'SYSTEM',
              iconValue: 'square.and.arrow.down',
            },
          },
        ],
      },
    ].filter((item) => item),
  };
}

const $icon: ViewStyle = {
  width: 34,
  height: 34,
};
