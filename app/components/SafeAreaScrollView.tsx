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
    <SafeAreaView
      edges={['left', 'right']}
      {...safeAreaProps}
      style={[$defaultSafeAreaStyle, safeAreaProps?.style]}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic" {...scrollViewProps}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function ScrollSafeAreaView({
  children,
  safeAreaProps,
  ...scrollViewProps
}: SafeAreaScrollViewProps): JSX.Element {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" {...scrollViewProps}>
      <SafeAreaView edges={['left', 'right']} {...safeAreaProps}>
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}

const $defaultSafeAreaStyle: ViewStyle = {
  flex: 1,
};
