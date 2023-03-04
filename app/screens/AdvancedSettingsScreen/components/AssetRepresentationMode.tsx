import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ContextMenuButton, MenuActionConfig } from 'react-native-ios-context-menu';

import { ListSection, ListCell } from '@/components';
import { useTheme } from '@/theme';
import { SFSymbol } from 'react-native-sfsymbols';
import { t } from '@/i18n';
import { useStores } from '@/models';

export enum AssetRepresentationMode {
  Auto = 'auto',
  Compatible = 'compatible',
  Current = 'current',
}

const menuConfig = {
  menuTitle: t('advancedSettingsScreen.assetRepresentationMode.title'),
  menuItems: [
    {
      actionKey: AssetRepresentationMode.Auto,
      actionTitle: t('advancedSettingsScreen.assetRepresentationMode.menu.auto.title'),
      actionSubtitle: t('advancedSettingsScreen.assetRepresentationMode.menu.auto.description'),
    },
    {
      actionKey: AssetRepresentationMode.Compatible,
      actionTitle: t('advancedSettingsScreen.assetRepresentationMode.menu.compatible.title'),
      actionSubtitle: t(
        'advancedSettingsScreen.assetRepresentationMode.menu.compatible.description',
      ),
    },
    {
      actionKey: AssetRepresentationMode.Current,
      actionTitle: t('advancedSettingsScreen.assetRepresentationMode.menu.current.title'),
      actionSubtitle: t('advancedSettingsScreen.assetRepresentationMode.menu.current.description'),
    },
  ],
};

export const AssetRepresentationModeSection = observer(() => {
  const { colors } = useTheme();
  const { settingsStore } = useStores();

  const currentModeTitle = useMemo(() => {
    return menuConfig.menuItems.find(
      (item) => item.actionKey === settingsStore.assetRepresentationMode,
    ).actionTitle;
  }, [settingsStore.assetRepresentationMode]);

  const handleMenuAction = useCallback(
    ({ nativeEvent }: { nativeEvent: MenuActionConfig }) => {
      settingsStore.setAssetRepresentationMode(nativeEvent.actionKey as AssetRepresentationMode);
    },
    [settingsStore.setAssetRepresentationMode],
  );

  return (
    <ListSection descriptionTk="advancedSettingsScreen.assetRepresentationMode.description">
      <ContextMenuButton
        isMenuPrimaryAction
        menuConfig={menuConfig}
        onPressMenuItem={handleMenuAction}
      >
        <ListCell
          tk="advancedSettingsScreen.assetRepresentationMode.title"
          rightIcon={
            <SFSymbol
              style={{
                width: 20,
                height: 20,
                marginLeft: 5,
              }}
              color={colors.opaqueSeparator}
              name="chevron.up.chevron.down"
            />
          }
          RightAccessory={currentModeTitle}
          bottomSeparator={false}
        />
      </ContextMenuButton>
    </ListSection>
  );
});
