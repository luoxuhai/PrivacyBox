import { colors, spacing, typography, useTheme } from '@/theme';
import React from 'react';
import { View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Text } from '../Text';
import { TextKeyPath } from '@/i18n';

interface ListSectionProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleTk?: TextKeyPath;
}

export function ListSection(props: ListSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={[$container, props.style]}>
      {props.titleTk && (
        <Text style={[$title, { color: colors.secondaryLabel }]} tk={props.titleTk} />
      )}
      <View style={$content}>{props.children}</View>
    </View>
  );
}

const $container: ViewStyle = {
  marginVertical: spacing[5],
};

const $content: ViewStyle = {
  borderRadius: 10,
  overflow: 'hidden',
};

const $title: TextStyle = {
  ...typography.footnote,
  backgroundColor: colors.light.transparent,
  marginHorizontal: spacing[5],
  marginBottom: 10,
};
