import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigators';
import { Screen, Text, ExitButton } from '@/components';
import { useTheme } from '@/theme';

export const DebugScreen: FC<StackScreenProps<SettingStackParamList, 'Debug'>> = observer(
  function DebugScreen(props) {
    const { colors } = useTheme();

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => <ExitButton onPress={props.navigation.goBack} />,
      });
    }, []);

    return (
      <Screen style={$screen} statusBarStyle="inverted">
        <Text text="debug" />
      </Screen>
    );
  },
);

const $screen: ViewStyle = {
  flex: 1,
};
