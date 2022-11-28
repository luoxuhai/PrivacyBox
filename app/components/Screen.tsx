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
  keyboardAvoidingEnabled?: boolean;
  safeAreaEnabled?: boolean;
}

export function Screen(props: ScreenProps) {
  const { isDark } = useTheme();
  const {
    keyboardAvoidingViewProps,
    keyboardOffset = 0,
    statusBarStyle = isDark ? 'light' : 'dark',
    keyboardAvoidingEnabled = false,
    safeAreaEnabled = false,
  } = props;

  return (
    <View style={[$screen, props.style]}>
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
}

const $screen: ViewStyle = {
  flex: 1,
};

const $keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
};
