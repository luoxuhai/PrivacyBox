import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamList } from '@/navigators';
import { Button, Screen, Text } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AppLockScreen: FC<StackScreenProps<AppStackParamList, 'AppLock'>> = observer(
  function AppLockScreen(props) {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
      <Screen style={$screen}>
        <SafeAreaView edges={['bottom', 'left', 'right', 'top']}>
          <Text text="appLock" />
          <Button text="xx" onPress={props.navigation.goBack} />
        </SafeAreaView>
      </Screen>
    );
  },
);

const $screen: ViewStyle = {
  flex: 1,
  backgroundColor: 'transparent',
};
