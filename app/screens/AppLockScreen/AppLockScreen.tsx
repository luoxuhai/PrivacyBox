import React, { FC, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, TextStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SFSymbol } from 'react-native-sfsymbols';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { AppStackParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { PasscodeKeyboard } from './PasscodeKeyboard';
import { PasscodeIndicator } from './PasscodeIndicator';
import { BiometricsButton } from './BiometricsButton';
import { HapticFeedback, useUpdateEffect } from '@/utils';
import { PASSCODE_LENGTH } from './constant';
import { useStores } from '@/models';

export const AppLockScreen: FC<StackScreenProps<AppStackParamList, 'AppLock'>> = observer(
  function AppLockScreen(props) {
    const { colors } = useTheme();
    const { portrait } = useDeviceOrientation();
    const [passcode, setPasscode] = useState('');
    const disabled = useRef(false);

    const { appLockStore } = useStores();
    const offset = useSharedValue(0);

    const $safeAreaViewStyles: ViewStyle[] = [
      $safeAreaView,
      {
        flexDirection: portrait ? 'column' : 'row',
        justifyContent: portrait ? 'center' : 'space-evenly',
      },
    ];

    const $animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: offset.value,
          },
        ],
      };
    });

    function failedUnlock() {
      disabled.current = true;
      offset.value = withSequence(
        withTiming(-12, { duration: 30 }),
        withRepeat(withTiming(12, { duration: 90 }), 3, true),
        withTiming(0, { duration: 30 }),
      );
      HapticFeedback.notification.error();
      setTimeout(() => {
        clearPasscode();
        disabled.current = false;
      }, 200);
    }

    useUpdateEffect(() => {
      if (passcode.length === PASSCODE_LENGTH) {
        if (appLockStore.fakePasscodeEnabled && appLockStore.fakePasscode === passcode) {
          appLockStore.setInFakeEnvironment(true);
          unlock();
          return;
        }

        if (passcode === appLockStore.passcode) {
          appLockStore.setInFakeEnvironment(false);
          unlock();
          return;
        }

        failedUnlock();
      }
    }, [passcode]);

    function handlePasscodeChange(key: string) {
      if (disabled.current) {
        return;
      }
      setPasscode((v) => (v.length === PASSCODE_LENGTH ? v : v + key));
    }

    function handlePasscodeDelete() {
      if (disabled.current) {
        return;
      }
      setPasscode((v) => v.slice(0, -1));
    }

    function unlock() {
      if (props.navigation.canGoBack()) {
        props.navigation.goBack();
      } else {
        props.navigation.replace('Content');
      }

      appLockStore.unlock();
      clearPasscode();
    }

    function clearPasscode() {
      setPasscode('');
    }

    return (
      <Screen style={{ backgroundColor: colors.background }}>
        <SafeAreaView style={$safeAreaViewStyles}>
          <View style={$header}>
            <Animated.View style={$animatedStyles}>
              <SFSymbol name="lock.fill" size={40} color={colors.label} />
            </Animated.View>
            <Text style={$headerText} color={colors.label} text="输入密码" />
            <PasscodeIndicator
              style={$animatedStyles}
              progress={passcode.length / PASSCODE_LENGTH}
            />
          </View>
          <PasscodeKeyboard
            Accessory={<BiometricsButton onFail={failedUnlock} onSuccess={unlock} />}
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
