import React from 'react';
import { observer } from 'mobx-react-lite';
import { StyleSheet, ViewStyle } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import Animated, { FadeIn } from 'react-native-reanimated';

import { BlurView } from '@/components';
import { useTheme } from '@/theme';
import { useStores } from '@/models';

export const AppMaskScreen = observer(function AppMaskScreen() {
  const { isDark } = useTheme();
  const { globalStore } = useStores();
  const blurType = isDark ? 'thickMaterialDark' : 'materialLight';

  if (!globalStore.appMaskVisible) {
    return null;
  }

  return (
    <FullWindowOverlay style={$overlay}>
      <Animated.View style={$blurView} entering={FadeIn.duration(100)}>
        <BlurView style={$blurView} blurType={blurType} />
      </Animated.View>
    </FullWindowOverlay>
  );
});

const $overlay: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  flex: 1,
};

const $blurView: ViewStyle = {
  flex: 1,
};
