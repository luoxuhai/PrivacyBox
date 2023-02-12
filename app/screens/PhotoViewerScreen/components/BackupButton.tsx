import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

import { useTheme } from '@/theme';

interface BackupButtonProps {
  onPress?: () => void;
}

export function BackupButton(props: BackupButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={props.onPress}
    >
      <SFSymbol
        style={{
          width: 26,
          height: 26,
        }}
        name="icloud.and.arrow.up"
        weight="medium"
        color={colors.palette.primary6}
      />
    </TouchableOpacity>
  );
}
