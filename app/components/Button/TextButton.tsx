import React from 'react';
import { ButtonProps, Button, View, StyleProp, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';

import { useTheme } from '@/theme';
import { TextProps } from '../Text';
import { translate } from '@/i18n';

export interface TextButtonProps extends Omit<ButtonProps, 'title'> {
  /**
   * Text which is looked up via i18n.
   */
  tk?: TextProps['tk'];
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps['text'];
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  tkOptions?: TextProps['tkOptions'];
  style?: StyleProp<ViewStyle>;
}

export const TextButton = observer<TextButtonProps>((props) => {
  const { tk, text, tkOptions, ...rest } = props;
  const { colors } = useTheme();

  const title = text ?? translate(tk, tkOptions);

  return (
    <View style={props.style}>
      <Button title={title} color={colors.palette.primary6} {...rest} />
    </View>
  );
});
