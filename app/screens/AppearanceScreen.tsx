import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigators';
import { Screen, Text, ListSection, ListCell, SafeAreaScrollView } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { colors, useTheme } from '@/theme';
import { appearanceToMode } from '@/models/ThemeStore';
import { TextKeyPath } from '@/i18n';
import { Check as IconCheck } from 'iconoir-react-native';

export const AppearanceScreen: FC<StackScreenProps<SettingStackParamList, 'Appearance'>> = observer(
  function AppearanceScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
      <Screen style={$screen}>
        <SafeAreaScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        >
          <AppearanceColorSection />
          <AppIconSection />
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

const ICON_CHECK_SIZE = 22;
function AppearanceColorSection() {
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
      {list.map((item) => {
        const isSelected = item.mode === appearanceToMode(appearance, isSystemAppearance);
        return (
          <ListCell
            key={item.mode}
            tk={item.label}
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
            onPress={() => setAppearanceMode(item.mode)}
          />
        );
      })}
    </ListSection>
  );
}

function AppIconSection() {
  return (
    <ListSection titleTk="appearanceScreen.appIcon.title">
      <ListCell />
      <ListCell />
      <ListCell />
    </ListSection>
  );
}

const $screen: ViewStyle = {
  flex: 1,
};
