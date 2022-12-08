import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { Check as IconCheck } from 'iconoir-react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { SettingStackParamList } from '@/navigators';
import { Screen, ListSection, ListCell, SafeAreaScrollView } from '@/components';
import { spacing, useTheme } from '@/theme';
import { appearanceToMode } from '@/models/ThemeStore';
import { TextKeyPath } from '@/i18n';
import { ICON_CHECK_SIZE } from '@/constants';
import { AppIconSection } from './AppIconSection';
import { HapticFeedback } from '@/utils';

export const AppearanceScreen: FC<StackScreenProps<SettingStackParamList, 'Appearance'>> = observer(
  () => {
    const bottomTabBarHeight = useBottomTabBarHeight();

    return (
      <Screen type="tabView">
        <SafeAreaScrollView
          contentContainerStyle={[
            $contentContainer,
            {
              paddingBottom: bottomTabBarHeight,
            },
          ]}
        >
          <AppearanceColorSection />
          <AppIconSection />
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

const AppearanceColorSection = observer(() => {
  const { appearance, isSystemAppearance, colors, setAppearanceMode } = useTheme();

  const list: { mode: AppearanceMode; label: TextKeyPath }[] = [
    {
      label: 'appearanceScreen.appearanceColor.auto',
      mode: 'auto',
    },
    {
      label: 'appearanceScreen.appearanceColor.light',
      mode: 'light',
    },
    {
      label: 'appearanceScreen.appearanceColor.dark',
      mode: 'dark',
    },
  ];

  return (
    <ListSection titleTk="appearanceScreen.appearanceColor.title">
      {list.map((item, idx) => {
        const isSelected = item.mode === appearanceToMode(appearance, isSystemAppearance);
        const bottomSeparator = idx < list.length - 1;

        return (
          <ListCell
            key={item.mode}
            tk={item.label}
            bottomSeparator={bottomSeparator}
            rightIcon={
              isSelected ? (
                <IconCheck
                  width={ICON_CHECK_SIZE}
                  height={ICON_CHECK_SIZE}
                  color={colors.palette.primary6}
                  strokeWidth={2.5}
                />
              ) : null
            }
            onPress={() => {
              setAppearanceMode(item.mode);
              HapticFeedback.selection();
            }}
          />
        );
      })}
    </ListSection>
  );
});

const $contentContainer: ViewStyle = {
  paddingTop: spacing[5],
  paddingHorizontal: spacing[5],
};
