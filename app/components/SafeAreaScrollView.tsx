import React from 'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface SafeAreaScrollViewProps extends ScrollViewProps {
  safeAreaProps?: SafeAreaViewProps;
}

export function SafeAreaScrollView({
  children,
  safeAreaProps,
  ...scrollViewProps
}: SafeAreaScrollViewProps): JSX.Element {
  return (
    <SafeAreaView {...safeAreaProps} style={[$defaultSafeAreaStyle, safeAreaProps.style]}>
      <ScrollView {...scrollViewProps}>{children}</ScrollView>
    </SafeAreaView>
  );
}

export function ScrollSafeAreaView({
  children,
  safeAreaProps,
  ...scrollViewProps
}: SafeAreaScrollViewProps): JSX.Element {
  return (
    <ScrollView {...scrollViewProps}>
      <SafeAreaView {...safeAreaProps}>{children}</SafeAreaView>
    </ScrollView>
  );
}

const $defaultSafeAreaStyle: ViewStyle = {
  flex: 1,
};
