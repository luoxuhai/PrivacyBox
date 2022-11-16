import React, { ErrorInfo } from 'react';
import { ScrollView, TextStyle, ViewStyle } from 'react-native';
import { Button, Screen, Text } from '@/components';
import { spacing, useTheme } from '@/theme';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo;
  onReset(): void;
}

export function ErrorDetails(props: ErrorDetailsProps) {
  const { colors } = useTheme();

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={$contentContainer}
    >
      <ScrollView
        style={[
          $errorSection,
          {
            backgroundColor: colors.separator,
          },
        ]}
        contentContainerStyle={$errorSectionContentContainer}
      >
        <Text
          style={{
            color: colors.error,
          }}
          text={`${props.error}`.trim()}
        />
        <Text
          selectable
          style={[$errorBacktrace, { color: colors.tertiaryLabel }]}
          text={`${props.errorInfo.componentStack}`.trim()}
        />
      </ScrollView>

      <Button
        preset="reversed"
        style={[
          $resetButton,
          {
            backgroundColor: colors.error,
          },
        ]}
        onPress={props.onReset}
        tk="errorScreen.reset"
      />
    </Screen>
  );
}

const $contentContainer: ViewStyle = {
  alignItems: 'center',
  paddingHorizontal: spacing[6],
  paddingTop: spacing[10],
  flex: 1,
};

const $errorSection: ViewStyle = {
  flex: 2,
  marginVertical: spacing[5],
  borderRadius: 6,
};

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing[5],
};

const $errorBacktrace: TextStyle = {
  marginTop: spacing[5],
};

const $resetButton: ViewStyle = {
  paddingHorizontal: spacing[5],
};
