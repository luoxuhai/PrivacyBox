import React, { ReactElement, useMemo } from 'react';
import {
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { radius, spacing, typography, useTheme, lightPalette } from '@/theme';
import { Text, TextProps } from '../Text';
import { colord } from 'colord';

export interface ButtonProps extends TouchableOpacityProps {
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
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  isLoading?: boolean;
  color?: string;
  LeftAccessory?: ReactElement | string;
}

export function Button(props: ButtonProps) {
  const { tk, text, tkOptions, style, textStyle, color, LeftAccessory, ...rest } = props;
  const { colors } = useTheme();

  const _color = color || colors.palette.primary6;

  const backgroundColor = useMemo(
    () => (rest.disabled ? colord(_color).lighten(0.1).toRgbString() : _color),
    [_color, rest.disabled],
  );

  return (
    <TouchableOpacity
      disabled={rest.disabled}
      activeOpacity={0.5}
      style={[
        $buttonStyle,
        style,
        {
          backgroundColor,
        },
      ]}
      accessibilityRole="button"
      {...rest}
    >
      {LeftAccessory}
      {tk || text ? (
        <Text style={[$textStyle, textStyle]} tk={tk} tkOptions={tkOptions} text={text} />
      ) : null}
    </TouchableOpacity>
  );
}

const $buttonStyle: ViewStyle = {
  height: 44,
  borderRadius: radius[4],
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[4],
  overflow: 'hidden',
};

const $textStyle: TextStyle = {
  ...typography.headline,
  flexShrink: 0,
  color: lightPalette.white,
};
