import React, { ErrorInfo } from 'react';
import { ScrollView, TextStyle, ViewStyle, Linking, View } from 'react-native';
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
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Text
          style={{
            ...typography.title1,
            marginBottom: spacing[3],
          }}
        >
          🤯 {t('errorScreen.title')}
        </Text>

        <View
          style={{
            height: 300,
            width: '100%',
          }}
        >
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
            {__DEV__ && (
              <Text
                selectable
                style={[$errorBacktrace, { color: colors.tertiaryLabel }]}
                text={`${props.errorInfo.componentStack}`.trim()}
              />
            )}
          </ScrollView>
        </View>

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
  marginVertical: spacing[5],
  marginHorizontal: spacing[5],
  borderRadius: 6,
  flexGrow: 1,
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
