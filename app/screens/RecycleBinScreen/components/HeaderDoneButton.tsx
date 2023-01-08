import React from 'react';
import { TextStyle } from 'react-native';

import { TextButton } from '@/components';
import { typography, useTheme } from '@/theme';

interface HeaderDoneButtonProps {
  visible: boolean;
  onPress: () => void;
}

export function HeaderDoneButton(props: HeaderDoneButtonProps) {
  const { colors } = useTheme();

  return (
    <TextButton
      style={{ display: props.visible ? 'flex' : 'none' }}
      textStyle={[
        $text,
        {
          color: colors.palette.primary6,
        },
      ]}
      tk="common.done"
      onPress={props.onPress}
    />
  );
}

const $text: TextStyle = {
  ...typography.body,
};
