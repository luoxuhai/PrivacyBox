import React from 'react';
import { TextStyle, TouchableOpacity } from 'react-native';

import { Text } from '@/components';
import { typography, useTheme } from '@/theme';

interface HeaderDoneButtonProps {
  visible: boolean;
  onPress: () => void;
}

export function HeaderDoneButton(props: HeaderDoneButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{ display: props.visible ? 'flex' : 'none' }}
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      <Text style={$text} tk={'common.done'} color={colors.palette.primary6} />
    </TouchableOpacity>
  );
}

const $text: TextStyle = {
  ...typography.body,
};
