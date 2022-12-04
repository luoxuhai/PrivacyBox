import React from 'react';
import { ButtonProps, Button } from 'react-native';
import { useTheme } from '@/theme';
import { TextProps } from '../Text';
import { translate } from '@/i18n';
import { observer } from 'mobx-react-lite';

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
}

export const TextButton = observer<TextButtonProps>((props) => {
  const { tk, text, tkOptions, ...rest } = props;
  const { colors } = useTheme();

  const title = text ?? translate(tk, tkOptions);

  return <Button title={title} color={colors.palette.primary6} {...rest} />;
});
