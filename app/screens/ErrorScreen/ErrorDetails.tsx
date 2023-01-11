import React, { ErrorInfo } from 'react';
import { ScrollView, TextStyle, ViewStyle, Linking } from 'react-native';
import { Button, Screen, Text } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Config from '@/config';
import { t } from '@/i18n';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo;
  onReset(): void;
}

export function ErrorDetails(props: ErrorDetailsProps) {
  const { colors } = useTheme();

  return (
    <Screen>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            ...typography.title2,
          }}
        >
          🤯 {t('errorScreen.title')}
        </Text>
        <ScrollView
          style={[
            $errorSection,
            {
              backgroundColor: colors.background,
            },
          ]}
          contentContainerStyle={$errorSectionContentContainer}
        >
          <Text
            style={{
              color: colors.error,
            }}
            selectable
            text={`${props.error}`.trim()}
          />
          {
            __DEV__ && <Text
              selectable
              style={[$errorBacktrace, { color: colors.tertiaryLabel }]}
              text={`${props.errorInfo.componentStack}`.trim()}
            />
          }
        </ScrollView>

        <Button
          style={[
            $resetButton,
            {
              backgroundColor: colors.error,
              marginBottom: 10,
            },
          ]}
          onPress={props.onReset}
          tk="errorScreen.reset"
        />
        <Button
          style={[
            $resetButton,
            {
              backgroundColor: colors.error,
            },
          ]}
          onPress={() => {
            Linking.openURL(Config.TXC_FEEDBACK_URL);
          }}
          tk="errorScreen.feedback"
        />
      </SafeAreaView>
    </Screen>
  );
}

const $errorSection: ViewStyle = {
  flex: 1,
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
  width: 200,
};
