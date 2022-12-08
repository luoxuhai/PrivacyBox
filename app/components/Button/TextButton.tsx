import React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, TextStyle } from 'react-native';
import { observer } from 'mobx-react-lite';

import { typography, useTheme } from '@/theme';
import { TextProps, Text } from '../Text';

export interface TextButtonProps extends TouchableOpacityProps {
  tk?: TextProps['tk'];
  tkOptions?: TextProps['tkOptions'];
  text?: TextProps['text'];
  textStyle?: StyleProp<TextStyle>;
}

export const TextButton = observer<TextButtonProps>((props) => {
  const { tk, text, tkOptions, textStyle, ...rest } = props;
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={props.style} activeOpacity={0.5} {...rest}>
      <Text
        style={[{ color: colors.palette.primary6 }, $textStyle, textStyle]}
        tk={tk}
        text={text}
        tkOptions={tkOptions}
      />
    </TouchableOpacity>
  );
});

const $textStyle: TextStyle = {
  ...typography.body,
};
