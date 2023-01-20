import React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, StyleProp, TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SFSymbol } from 'react-native-sfsymbols';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Text } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { PasscodeKeyboard } from './PasscodeKeyboard';
import { PasscodeIndicator } from './PasscodeIndicator';
import { BiometricsButton } from './BiometricsButton';
import { HapticFeedback, useUpdateEffect } from '@/utils';
import { PASSCODE_LENGTH } from './constants';
import { TextKeyPath } from '@/i18n';

interface AppLockViewProps {
  style?: StyleProp<ViewStyle>;
  tk?: TextKeyPath;
  textStyle?: StyleProp<TextStyle>;
  passcode: string;
  icon?: string;
  biometricsVisible?: boolean;
  isError?: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  onUnlock?: () => void;
  onUnlockFailed?: () => void;
}

export const AppLockView = observer<AppLockViewProps>((props) => {
  const { colors } = useTheme();
  const offset = useSharedValue(0);

  const $animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  useUpdateEffect(() => {
    if (props.isError) {
      offset.value = withSequence(
        withTiming(-12, { duration: 30 }),
        withRepeat(withTiming(12, { duration: 90 }), 3, true),
        withTiming(0, { duration: 30 }),
      );
      HapticFeedback.notification.error();
    }
  }, [props.isError]);

  return (
    <SafeAreaView style={[props.style, { backgroundColor: colors.background }]}>
      <View style={$header}>
        {props.icon ? (
          <Animated.View style={[$iconStyle, $animatedStyles]}>
            <SFSymbol name={props.icon} size={40} color={colors.label} />
          </Animated.View>
        ) : null}

        {props.tk ? (
          <Text style={[$headerText, props.textStyle]} color={colors.label} tk={props.tk} />
        ) : null}

        <PasscodeIndicator
          style={$animatedStyles}
          progress={props.passcode.length / PASSCODE_LENGTH}
        />
      </View>
      <PasscodeKeyboard
        {...(props.biometricsVisible && {
          Accessory: <BiometricsButton onFail={props.onUnlockFailed} onSuccess={props.onUnlock} />,
        })}
        hideDeleteKey={!props.passcode}
        onChange={props.onChange}
        onDelete={props.onDelete}
      />
    </SafeAreaView>
  );
});

const $header: ViewStyle = {
  alignItems: 'center',
};

const $headerText: TextStyle = {
  ...typography.title3,
  fontWeight: '500',
  marginBottom: spacing[9],
};

const $iconStyle: ViewStyle = {
  marginBottom: spacing[13],
};
