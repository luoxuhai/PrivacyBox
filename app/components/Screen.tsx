import React from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ViewStyle,
  View,
  StyleProp,
  ColorValue,
  ViewProps,
} from 'react-native';
import { StatusBar, StatusBarProps } from 'expo-status-bar';
import { useTheme } from '@/theme';
import { observer } from 'mobx-react-lite';

interface ScreenProps {
  style?: StyleProp<ViewStyle>;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: 'light' | 'dark' | 'inverted';
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  statusBarProps?: StatusBarProps;
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
  keyboardAvoidingEnabled?: boolean;
  safeAreaEnabled?: boolean;
  type?: 'tabView' | 'normal';
  onLayout?: ViewProps['onLayout'];
}

export const Screen = observer((props: ScreenProps) => {
  const { isDark, colors } = useTheme();
  const {
    keyboardAvoidingViewProps,
    keyboardOffset = 0,
    keyboardAvoidingEnabled = false,
    type = 'normal',
  } = props;

  const statusBarStyle = props.statusBarStyle ?? isDark ? 'light' : 'dark';
  const backgroundColor =
    type === 'normal' ? undefined : isDark ? colors.background : colors.secondaryBackground;

  return (
    <View style={[$screen, props.style, { backgroundColor }]} onLayout={props.onLayout}>
      <StatusBar style={statusBarStyle} animated {...props.statusBarProps} />
      {keyboardAvoidingEnabled ? (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={keyboardOffset}
          {...keyboardAvoidingViewProps}
          style={[$keyboardAvoidingViewStyle, keyboardAvoidingViewProps?.style]}
        >
          {props.children}
        </KeyboardAvoidingView>
      ) : (
        props.children
      )}
    </View>
  );
});

const $screen: ViewStyle = {
  flex: 1,
};

const $keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
};
