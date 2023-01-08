import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

import { useTheme } from '@/theme';

interface BackButtonProps {
  onPress?: () => void;
}

export function BackButton(props: BackButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: 22,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={props.onPress}
    >
      <SFSymbol size={22} name="chevron.backward" weight="medium" color={colors.palette.primary6} />
    </TouchableOpacity>
  );
}
