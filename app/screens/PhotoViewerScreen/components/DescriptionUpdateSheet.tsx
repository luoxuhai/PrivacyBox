import React, { useCallback, useRef } from 'react';
import { TextInput, TextStyle, View, ViewStyle } from 'react-native';
import ActionSheet, { SheetProps, SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';

import { radius, spacing, typography, useTheme } from '@/theme';
import { ExitButton, ListSection, SafeAreaScrollView, Text, TextButton } from '@/components';
import { FetchPhotosResult } from '@/services/local';
import { t } from '@/i18n';

const HEIGHT = 350;

interface DescriptionUpdateSheetProps extends SheetProps<{ item?: FetchPhotosResult }> {}

export const DescriptionUpdateSheet = observer<DescriptionUpdateSheetProps>(
  (props) => {
    const { item } = props.payload;
    const { colors } = useTheme();
    const safeAreaInsets = useSafeAreaInsets();
    const textInputValue = useRef<string>();

    const handleDone = useCallback(
      (isCancel: boolean) => {
        SheetManager.hide(props.sheetId, {
          payload: [isCancel, textInputValue.current],
        });
      },
      [textInputValue.current],
    );

    return (
      <ActionSheet
        id={props.sheetId}
        containerStyle={{
          paddingBottom: safeAreaInsets.bottom,
          backgroundColor: colors.secondaryBackground,
          ...$containerStyle,
        }}
        CustomHeaderComponent={
          <HeaderComponent onClose={() => handleDone(true)} onDone={() => handleDone(false)} />
        }
        gestureEnabled={false}
        headerAlwaysVisible
      >
        <SafeAreaScrollView style={$scrollView} contentContainerStyle={$contentContainerStyle}>
          <ListSection
            style={{
              ...$listSection,
              backgroundColor: colors.background,
            }}
          >
            <TextInput
              multiline
              autoFocus
              placeholder={t('photoViewerScreen.bottomToolbar.descPlaceholder')}
              defaultValue={item?.description}
              placeholderTextColor={colors.tertiaryLabel}
              onChangeText={(text) => (textInputValue.current = text)}
              style={[
                $input,
                {
                  color: colors.label,
                  backgroundColor: colors.background,
                  height: HEIGHT / 2,
                },
              ]}
            />
          </ListSection>
        </SafeAreaScrollView>
      </ActionSheet>
    );
  },
  { forwardRef: true },
);

interface HeaderComponentProps {
  onClose: () => void;
  onDone: () => void;
}

function HeaderComponent(props: HeaderComponentProps) {
  const { colors } = useTheme();

  return (
    <View style={$headerContainer}>
      <ExitButton onPress={() => props.onClose()} />
      <Text
        style={$headerTitle}
        tk="photoViewerScreen.bottomToolbar.description"
        color={colors.label}
      />
      <TextButton tk="common.done" onPress={() => props.onDone()} />
    </View>
  );
}

const $containerStyle: ViewStyle = {
  height: HEIGHT,
  borderTopLeftRadius: radius[10],
  borderTopRightRadius: radius[10],
  paddingVertical: spacing[5],
};

const $headerContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: spacing[6],
};

const $headerTitle: TextStyle = {
  ...typography.title3,
  fontWeight: '500',
};

const $scrollView: ViewStyle = {
  flex: 1,
  marginTop: spacing[6],
};

const $contentContainerStyle: ViewStyle = {
  paddingHorizontal: spacing[6],
};

const $input: TextStyle = {
  padding: 16,
  fontSize: 16,
};

const $listSection: ViewStyle = {
  marginVertical: 0,
  height: HEIGHT,
  padding: spacing[5],
  borderRadius: 12,
};
