import React, { FC, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, TextStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SFSymbol } from 'react-native-sfsymbols';

import { AppStackParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { PasscodeKeyboard } from './PasscodeKeyboard';
import { PasscodeIndicator, PasscodeIndicatorRef } from './PasscodeIndicator';
import { BiometricsButton } from './BiometricsButton';

export const AppLockScreen: FC<StackScreenProps<AppStackParamList, 'AppLock'>> = observer(
  function AppLockScreen(props) {
    const { colors } = useTheme();
    const { portrait } = useDeviceOrientation();
    const [passcode, setPasscode] = useState('');
    const passcodeIndicatorRef = useRef<PasscodeIndicatorRef>(null);

    const $safeAreaViewStyles: ViewStyle[] = [
      $safeAreaView,
      {
        flexDirection: portrait ? 'column' : 'row',
        justifyContent: portrait ? 'center' : 'space-evenly',
      },
    ];

    function handlePasscodeChange(key: string) {
      setPasscode((v) => (v.length === 6 ? v : v + key));
      if (passcode.length === 5) {
        if (props.navigation.canGoBack()) {
          props.navigation.goBack();
        } else {
          props.navigation.replace('Content');
        }

        setPasscode('');
      }
      // passcodeIndicatorRef.current.triggerFail();
    }

    function handlePasscodeDelete() {
      setPasscode((v) => v.slice(0, -1));
    }

    return (
      <Screen style={{ backgroundColor: colors.background }}>
        <SafeAreaView style={$safeAreaViewStyles}>
          <View style={$header}>
            <SFSymbol name="lock.fill" size={40} color={colors.label} />
            <Text style={$headerText} text="输入密码" />
            <PasscodeIndicator ref={passcodeIndicatorRef} progress={passcode.length / 6} />
          </View>
          <PasscodeKeyboard
            Accessory={<BiometricsButton />}
            hideDeleteKey={!passcode}
            onChange={handlePasscodeChange}
            onDelete={handlePasscodeDelete}
          />
        </SafeAreaView>
      </Screen>
    );
  },
);

const $safeAreaView: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const $header: ViewStyle = {
  alignItems: 'center',
};

const $headerText: TextStyle = {
  ...typography.title3,
  fontWeight: '500',
  marginBottom: spacing[9],
  marginTop: spacing[13],
};
