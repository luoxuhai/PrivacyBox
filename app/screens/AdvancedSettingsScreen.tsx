import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigators';
import { Screen, Text, SafeAreaScrollView, ListSection, ListCell, Switch } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { spacing, useTheme } from '@/theme';
import { TextKeyPath } from '@/i18n';

export const AdvancedSettingsScreen: FC<
  StackScreenProps<SettingStackParamList, 'AdvancedSettings'>
> = observer(function AdvancedSettingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Screen>
      <SafeAreaScrollView contentContainerStyle={$contentContainer}>
        <ListSection descriptionTk="advancedSettingsScreen.importImageAfterDeleteTip">
          <ListCell
            tk="advancedSettingsScreen.importImageAfterDelete"
            rightIcon={null}
            RightAccessory={<Switch />}
          />
        </ListSection>
        <ListSection descriptionTk="advancedSettingsScreen.smartSearchTip">
          <ListCell
            tk="advancedSettingsScreen.smartSearch"
            rightIcon={null}
            RightAccessory={<Switch />}
          />
        </ListSection>
        <BottomTabVisibleSection />
      </SafeAreaScrollView>
    </Screen>
  );
});

const BottomTabVisibleSection = observer(() => {
  const list: { title: TextKeyPath; value: number }[] = [
    {
      title: 'contentNavigator.filesTab',
      value: 1,
    },
    {
      title: 'contentNavigator.albumTab',
      value: 1,
    },
    {
      title: 'contentNavigator.moreTab',
      value: 1,
    },
  ];

  return (
    <ListSection titleTk="advancedSettingsScreen.bottomTabVisible">
      {list.map((item) => {
        return (
          <ListCell key={item.title} tk={item.title} rightIcon={null} RightAccessory={<Switch />} />
        );
      })}
    </ListSection>
  );
});

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[8],
};
