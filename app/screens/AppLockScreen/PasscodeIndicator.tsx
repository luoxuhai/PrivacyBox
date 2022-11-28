import React, { useImperativeHandle } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { observer } from 'mobx-react-lite';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { spacing, useTheme } from '@/theme';
import { HapticFeedback } from '@/utils';

interface PasscodeIndicatorProps {
  style?: StyleProp<ViewStyle>;
  progress?: number;
}

export interface PasscodeIndicatorRef {
  triggerFail(): void;
}

const CIRCLE_SIZE = 16;

export const PasscodeIndicator = observer<PasscodeIndicatorProps, PasscodeIndicatorRef>(
  (props, ref) => {
    const { colors } = useTheme();
    const offset = useSharedValue(0);

    useImperativeHandle(ref, () => ({
      triggerFail() {
        handleFailAnimation();
        HapticFeedback.notification.error();
      },
    }));

    const $animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: offset.value,
          },
        ],
      };
    });

    function handleFailAnimation() {
      offset.value = withSequence(
        withTiming(-10, { duration: 30 }),
        withRepeat(withTiming(10, { duration: 60 }), 3, true),
        withTiming(0, { duration: 30 }),
      );
    }

    return (
      <Animated.View style={[$container, props.style, $animatedStyles]}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Animated.View
            style={[$circle, 6 * props.progress - 1 >= index && { backgroundColor: colors.label }]}
            key={index}
          />
        ))}
      </Animated.View>
    );
  },
  { forwardRef: true },
);

const $container: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: spacing[12]
};

const $circle: ViewStyle = {
  width: CIRCLE_SIZE,
  height: CIRCLE_SIZE,
  borderRadius: CIRCLE_SIZE / 2,
  borderWidth: 2,
  marginHorizontal: CIRCLE_SIZE / 2,
  backgroundColor: 'transparent',
};
