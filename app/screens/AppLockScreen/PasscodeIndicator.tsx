import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import { observer } from 'mobx-react-lite';
import Animated from 'react-native-reanimated';
import { spacing, useTheme } from '@/theme';
import { PASSCODE_LENGTH } from './constant';

interface PasscodeIndicatorProps {
  style?: StyleProp<ViewStyle>;
  progress?: number;
}

const CIRCLE_SIZE = 16;

export const PasscodeIndicator = observer<PasscodeIndicatorProps>((props) => {
  const { colors } = useTheme();

  return (
    <Animated.View style={[$container, props.style]}>
      {Array.from({ length: PASSCODE_LENGTH }).map((_, index) => (
        <Animated.View
          style={[
            $circle,
            {
              borderColor: colors.label,
            },
            PASSCODE_LENGTH * props.progress - 1 >= index && { backgroundColor: colors.label },
          ]}
          key={index}
        />
      ))}
    </Animated.View>
  );
});

const $container: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: spacing[12],
};

const $circle: ViewStyle = {
  width: CIRCLE_SIZE,
  height: CIRCLE_SIZE,
  borderRadius: CIRCLE_SIZE / 2,
  borderWidth: 2,
  marginHorizontal: CIRCLE_SIZE / 2,
  backgroundColor: 'transparent',
};
