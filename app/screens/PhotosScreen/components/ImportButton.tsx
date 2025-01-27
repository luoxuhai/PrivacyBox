import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { BounceIn } from 'react-native-reanimated';
import { SFSymbol } from 'react-native-sfsymbols';
import { SheetManager } from 'react-native-actions-sheet';
import { QueryKey } from '@tanstack/react-query';

import { HapticFeedback } from '@/utils';
import { useTheme } from '@/theme';
import { SelectionContext } from '../context';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ImportButtonProps {
  queryKey?: QueryKey;
}

export const ImportButton = observer<ImportButtonProps>((props) => {
  const { colors } = useTheme();
  const selection = useContext(SelectionContext);

  if (selection.enabled) {
    return null;
  }

  return (
    <AnimatedTouchableOpacity
      entering={BounceIn.delay(150)}
      style={[
        $container,
        {
          shadowColor: colors.palette.primary6,
          backgroundColor: colors.palette.white,
          bottom: 55,
        },
      ]}
      activeOpacity={0.5}
      onPress={() => {
        SheetManager.show('photo-importer-sheet', {
          payload: {
            queryKey: props.queryKey,
          },
        });
        HapticFeedback.impact.light();
      }}
    >
      <SFSymbol name="plus.circle.fill" size={50} color={colors.palette.primary6} />
    </AnimatedTouchableOpacity>
  );
});

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 40,
  borderRadius: 25,
  shadowOffset: {
    height: 3.5,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 6.5,
  width: 50,
  height: 50,
};
