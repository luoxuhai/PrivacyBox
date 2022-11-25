import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';

export const PurchaseScreen: FC<StackScreenProps<SettingStackParamList, 'Purchase'>> = observer(
  function PurchaseScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
      <Screen style={$screen} statusBarStyle="inverted">
        <Text text="purchase" />
      </Screen>
    );
  },
);

const $screen: ViewStyle = {
  flex: 1,
};
