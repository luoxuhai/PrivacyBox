import React from 'react';
import { spacing, typography, useTheme } from '@/theme';
import { View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Text } from '../Text';
import { TextKeyPath } from '@/i18n';

interface ListSectionProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleTk?: TextKeyPath;
  descriptionTk?: TextKeyPath;
}

export function ListSection(props: ListSectionProps) {
  const { colors } = useTheme();

  return (
    <View style={[$container, props.style]}>
      {props.titleTk && (
        <Text style={[$title, { color: colors.secondaryLabel }]} tk={props.titleTk} />
      )}
      <View style={$content}>{props.children}</View>
      {props.descriptionTk && (
        <Text style={[$description, { color: colors.secondaryLabel }]} tk={props.descriptionTk} />
      )}
    </View>
  );
}

const $container: ViewStyle = {
  marginVertical: spacing[3],
};

const $content: ViewStyle = {
  borderRadius: 10,
  overflow: 'hidden',
};

const $title: TextStyle = {
  ...typography.footnote,
  marginHorizontal: spacing[5],
  marginBottom: 10,
};

const $description: TextStyle = {
  ...typography.caption1,
  marginHorizontal: $title.marginHorizontal,
  marginTop: $title.marginBottom,
};
