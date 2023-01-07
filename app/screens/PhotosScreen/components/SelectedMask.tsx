import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SFSymbol } from 'react-native-sfsymbols';

import { radius, useTheme } from '@/theme';

interface SelectedMaskProps {
  visible: boolean;
}

export const SelectedMask = observer<SelectedMaskProps>((props) => {
  const { colors } = useTheme();

  return props.visible ? (
    <View style={$container} pointerEvents="none">
      <View style={$iconContainer}>
        <SFSymbol
          name="checkmark.circle.fill"
          style={{
            width: 22,
            height: 22,
          }}
          color={colors.palette.primary6}
        />
      </View>
    </View>
  ) : null;
});

const $container: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  borderRadius: radius[2],
};

const $iconContainer: ViewStyle = {
  position: 'absolute',
  bottom: 8,
  right: 8,
  width: 22,
  height: 22,
  backgroundColor: '#FFF',
  borderRadius: 11,
  justifyContent: 'center',
  alignItems: 'center',
};
