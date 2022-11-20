import React, { ReactElement } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { spacing, typography, useTheme } from '@/theme';
import { IconTypes } from '../Icon';
import { Text, TextProps } from '../Text';
import { NavArrowRight } from 'iconoir-react-native';

export interface ListCellProps extends TouchableHighlightProps {
  /**
   * Whether to show the top separator.
   * Default: false
   */
  topSeparator?: boolean;
  /**
   * Whether to show the bottom separator.
   * Default: false
   */
  bottomSeparator?: boolean;
  /**
   * Text to display if not using `tx` or nested components.
   */
  text?: TextProps['text'];
  /**
   * Text which is looked up via i18n.
   */
  tk?: TextProps['tk'];
  /**
   * Children components.
   */
  children?: TextProps['children'];
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  tkOptions?: TextProps['tkOptions'];
  /**
   * Optional View container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional TouchableOpacity style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Icon that should appear on the left.
   */
  leftIcon?: IconTypes;
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: IconTypes;
  /**
   * Left action custom ReactElement.
   * Overrides `leftIcon`.
   */
  LeftAccessory?: ReactElement;
}

/**
 * A styled row component that can be used in FlatList, SectionList, or by itself.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-ListItem.md)
 */
export function ListCell(props: ListCellProps) {
  const {
    bottomSeparator = true,
    children,
    LeftAccessory,
    leftIcon,
    rightIcon,
    style,
    text,
    tk,
    tkOptions,
    ...touchableOpacityProps
  } = props;
  const { colors, isDark } = useTheme();

  const $containerStyles = [
    $container,
    { backgroundColor: isDark ? colors.secondaryBackground : colors.background },
    style,
  ];
  const $contentStyles = [
    $content,
    bottomSeparator && {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.palette.gray4,
    },
  ];

  return (
    <TouchableHighlight
      {...touchableOpacityProps}
      style={$containerStyles}
      underlayColor={colors.palette.gray5}
    >
      <>
        {leftIcon}

        <View style={$contentStyles}>
          <Text
            tk={tk}
            text={text}
            tkOptions={tkOptions}
            style={[
              $text,
              {
                color: colors.label,
              },
            ]}
          >
            {children}
          </Text>

          <View style={$rightContent}>
            {LeftAccessory}
            {rightIcon !== null &&
              (rightIcon || (
                <NavArrowRight
                  width={24}
                  height={24}
                  strokeWidth={2}
                  color={colors.opaqueSeparator}
                />
              ))}
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

const $container: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: 45,
};

const $content: ViewStyle = {
  alignSelf: 'stretch',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: spacing[5],
};

const $text: TextStyle = {
  ...typography.body,
};

const $rightContent: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: spacing[4],
};
