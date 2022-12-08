import React from 'react';
import { View, ColorValue, ViewStyle, StyleProp } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

interface SettingsIconProps {
  backgroundColor: ColorValue;
  color: ColorValue;
  backgroundSize?: number;
  iconSize?: number;
  systemName?: string;
  radius?: number;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SettingsIcon(props: SettingsIconProps) {
  const { backgroundSize = 32, iconSize = 16, radius = 10, systemName, icon, color } = props;

  return (
    <View
      style={[
        $container,
        {
          backgroundColor: props.backgroundColor,
          width: backgroundSize,
          height: backgroundSize,
          borderRadius: radius,
        },
        props.style,
      ]}
    >
      {icon || (systemName && <SFSymbol name={systemName} size={iconSize} color={color} />)}
    </View>
  );
}

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
