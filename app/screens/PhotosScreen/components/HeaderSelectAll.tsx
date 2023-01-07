import React from 'react';
import { TextStyle, TouchableOpacity } from 'react-native';

import { Text } from '@/components';
import { typography, useTheme } from '@/theme';

interface HeaderSelectAllProps {
  visible: boolean;
  isSelectAll: boolean;
  onPress: () => void;
}

export function HeaderSelectAll(props: HeaderSelectAllProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        display: props.visible ? 'flex' : 'none',
      }}
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      <Text
        style={$text}
        tk={props.isSelectAll ? 'filesScreen.deselectAll' : 'filesScreen.selectAll'}
        color={colors.palette.primary6}
      />
    </TouchableOpacity>
  );
}

const $text: TextStyle = {
  ...typography.body,
};
