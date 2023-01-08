import React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import { SFSymbol } from 'react-native-sfsymbols';

export const iconProps = {
  size: 26,
  color: '#FFF',
};

interface IconButtonProps extends TouchableOpacityProps {
  name: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export function IconButton(props: IconButtonProps) {
  const { name, ...rest } = props;

  return (
    <TouchableOpacity activeOpacity={0.5} {...rest}>
      <SFSymbol
        name={name}
        color={iconProps.color}
        style={{
          width: iconProps.size,
          height: iconProps.size,
        }}
      />
    </TouchableOpacity>
  );
}
