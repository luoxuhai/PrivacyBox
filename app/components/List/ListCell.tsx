import React, { ReactElement, useState } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { NavArrowRight } from 'iconoir-react-native';
import { observer } from 'mobx-react-lite';
import Animated, { FadeIn } from 'react-native-reanimated';

import { spacing, typography, useTheme } from '@/theme';
import { Text, TextProps } from '../Text';
import { ImageIconTypes } from '../Icon/ImageIcon';

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
  textStyle?: TextProps['style'];
  /**
   * Children components.
   */
  children?: React.ReactElement | React.ReactElement[];
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
  leftIcon?: ImageIconTypes;
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: ReactElement;
  visible?: boolean;
  /**
   * Left action custom ReactElement.
   * Overrides `leftIcon`.
   */
  RightAccessory?: ReactElement | string;
}

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight);

export function ListCell(props: ListCellProps) {
  const {
    bottomSeparator = true,
    children,
    RightAccessory,
    leftIcon,
    rightIcon,
    style,
    text,
    tk,
    tkOptions,
    textStyle,
    visible = true,
    ...touchableOpacityProps
  } = props;
  const { colors, isDark } = useTheme();
  const [isPressIn, setIsPressIn] = useState(false);

  const $containerStyles = [
    $container,
    { backgroundColor: isDark ? colors.secondaryBackground : colors.background },
    style,
  ];
  const $contentStyles = [
    $content,
    bottomSeparator &&
      !isPressIn && {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.palette.gray4,
      },
  ];

  return visible ? (
    <AnimatedTouchableHighlight
      {...touchableOpacityProps}
      entering={FadeIn.duration(150)}
      style={$containerStyles}
      underlayColor={colors.palette.gray5}
      onPressIn={(event) => {
        setIsPressIn(true);
        touchableOpacityProps.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setIsPressIn(false);
        touchableOpacityProps.onPressOut?.(event);
      }}
    >
      <>
        {children || (
          <>
            {leftIcon ? <LeftIconWrapper>{leftIcon}</LeftIconWrapper> : null}

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
                  textStyle,
                ]}
              />

              <View style={$rightContent}>
                {RightAccessory ? (
                  <View style={$rightAccessory}>
                    {typeof RightAccessory === 'string' ? (
                      <ExtraText text={RightAccessory} />
                    ) : (
                      RightAccessory
                    )}
                  </View>
                ) : null}
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
        )}
      </>
    </AnimatedTouchableHighlight>
  ) : null;
}

function LeftIconWrapper({ children }: { children: React.ReactNode }) {
  return <View style={$leftIconWrapper}>{children}</View>;
}

const ExtraText = observer(({ text }: { text: string }) => {
  const { colors } = useTheme();
  return <Text style={[typography.subhead, { color: colors.secondaryLabel }]}>{text}</Text>;
});

const $container: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: 44,
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
  paddingVertical: spacing[2],
  flex: 1,
};

const $rightContent: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  paddingRight: spacing[4],
};

const $rightAccessory: ViewStyle = {
  marginRight: spacing[2],
};

const $leftIconWrapper: ViewStyle = {
  marginLeft: spacing[4],
};
