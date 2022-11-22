import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackScreenProps } from '@/navigators';
import { Screen, Text } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';


export const DebugScreen: FC<StackScreenProps<AppStackScreenProps, "Debug">> = observer(function DebugScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Screen style={$screen}>
      <Text text="debug" />
    </Screen>
  )
})

const $screen: ViewStyle = {
  flex: 1,
}
