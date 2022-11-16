import React, { useMemo } from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  ColorValue,
} from 'react-native';
import { TOptions } from 'i18next';

// import { colors, typography } from '../theme';
import { TextKeyPath, translate } from '../i18n';

type Sizes = keyof typeof $sizeStyles;
// type Weights = keyof typeof typography.primary;
// type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tk?: TextKeyPath;
  /**
   * Text which is looked up via i18n.
   */
  tkOptions?: TOptions;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  // /**
  //  * One of the different types of text presets.
  //  */
  // preset?: Presets;
  // /**
  //  * Text weight modifier.
  //  */
  // weight?: Weights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Text size modifier.
   */
  color?: ColorValue;
  /**
   * Children components.
   */
  children?: React.ReactNode;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const { size, tk, tkOptions, text, color, children, style: $styleOverride, ...rest } = props;

  const content = useMemo(() => translate(tk, tkOptions), [tk, tkOptions]);

  // const preset: Presets = $presets[props.preset] ? props.preset : 'default';
  const $styles = [
    { color },
    // $presets[preset],
    // $fontWeightStyles[weight],
    $sizeStyles[size],
    $styleOverride,
  ];

  return (
    <RNText {...rest} style={$styles}>
      {content || text || children}
    </RNText>
  );
}

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } as TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } as TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } as TextStyle,
  md: { fontSize: 18, lineHeight: 26 } as TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } as TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } as TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } as TextStyle,
};

// const $fontWeightStyles = Object.entries(typography.body).reduce((acc, [weight, fontFamily]) => {
//   return { ...acc, [weight]: { fontFamily } };
// }, {}) as Record<Weights, TextStyle>;

// const $baseStyle: StyleProp<TextStyle> = [
//   $sizeStyles.sm,
//   $fontWeightStyles.normal,
//   { color: colors.text },
// ];
// const $presets = {
//   default: $baseStyle,

//   bold: [$baseStyle, typography.body],

//   heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,

//   subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium] as StyleProp<TextStyle>,

//   formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

//   formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.normal] as StyleProp<TextStyle>,
// };
