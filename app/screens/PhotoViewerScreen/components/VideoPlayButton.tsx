import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';
import Animated, { FadeIn, FadeOut, AnimatedStyleProp } from 'react-native-reanimated';

import { RootNavigation } from '@/navigators';
import { useTheme } from '@/theme';
import { FetchPhotosResult } from '@/services/local';

const iconPlaySize = {
  width: 60,
  height: 60,
};

interface VideoPlayButtonProps {
  visible: boolean;
  disabled: boolean;
  item: FetchPhotosResult;
  animatedStyle: AnimatedStyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function VideoPlayButton(props: VideoPlayButtonProps) {
  const { colors } = useTheme();

  if (!props.visible) {
    return null;
  }

  return (
    <AnimatedPressable
      style={[
        $container,
        props.animatedStyle,
        {
          backgroundColor: colors.palette.gray1,
          borderColor: colors.palette.gray3,
        },
      ]}
      disabled={props.disabled}
      entering={FadeIn}
      exiting={FadeOut}
      onPress={() => {
        RootNavigation.navigate('VideoPlayer', {
          item: props.item,
        });
      }}
    >
      <SFSymbol size={iconPlaySize.width} name="play.circle.fill" color={colors.palette.white} />
    </AnimatedPressable>
  );
}

const $container: ViewStyle = {
  ...iconPlaySize,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: iconPlaySize.width / 2,
  borderWidth: StyleSheet.hairlineWidth,
  position: 'absolute',
  overflow: 'hidden',
  opacity: 0.95,
  top: '50%',
  left: '50%',
  transform: [{ translateX: -iconPlaySize.width / 2 }, { translateY: -iconPlaySize.height / 2 }],
};
