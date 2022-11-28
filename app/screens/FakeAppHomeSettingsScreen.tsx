import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { SettingStackParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme';

export const FakeAppHomeSettingsScreen: FC<
  StackScreenProps<SettingStackParamList, 'FakeAppHomeSettings'>
> = observer(function FakeAppHomeSettingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Screen style={$screen}>
      <Text text="fakeAppHomeSettings" />
    </Screen>
  );
});

const $screen: ViewStyle = {
  flex: 1,
};
