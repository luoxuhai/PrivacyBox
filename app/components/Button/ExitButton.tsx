import { useTheme } from '@/theme';
import React, { useMemo } from 'react';
import { TouchableOpacity, ViewStyle, TouchableOpacityProps } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';
import { colord } from 'colord';

export function ExitButton(props: TouchableOpacityProps) {
  const { colors } = useTheme();

  const backgroundColor = useMemo(
    () => colord(colors.tertiaryFill).alpha(0.19).toRgbString(),
    [colors.tertiaryFill],
  );

  return (
    <TouchableOpacity
      style={[
        $container,
        {
          backgroundColor,
        },
      ]}
      activeOpacity={0.8}
      {...props}
    >
      <SFSymbol name="xmark" size={15} weight="bold" color={colors.secondaryLabel} />
    </TouchableOpacity>
  );
}

const $container: ViewStyle = {
  width: 30,
  height: 30,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
};
