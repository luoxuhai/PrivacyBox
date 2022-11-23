import React from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ViewStyle,
  View,
  StyleProp,
} from 'react-native';
import { StatusBar, StatusBarProps } from 'expo-status-bar';
import { useTheme } from '@/theme';

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
}

export function Screen(props: ScreenProps) {
  const { isDark } = useTheme();
  const {
    keyboardAvoidingViewProps,
    keyboardOffset = 0,
    statusBarStyle = isDark ? 'light' : 'dark',
  } = props;

  return (
    <View style={[$screen, props.style]}>
      <StatusBar style={statusBarStyle} animated {...props.statusBarProps} />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={keyboardOffset}
        {...keyboardAvoidingViewProps}
        style={[$keyboardAvoidingViewStyle, keyboardAvoidingViewProps?.style]}
      >
        {props.children}
      </KeyboardAvoidingView>
    </View>
  );
}

const $screen: ViewStyle = {
  flex: 1,
};

const $keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
};
