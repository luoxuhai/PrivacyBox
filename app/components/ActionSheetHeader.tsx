import React, { ReactElement } from 'react';
import { StyleProp, TextStyle, View, ViewStyle, Text } from 'react-native';

import { spacing, typography } from '@/theme';

interface ActionSheetHeaderProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  LeftAccessory?: ReactElement;
  RightAccessory?: ReactElement;
}

export function ActionSheetHeader(props: ActionSheetHeaderProps) {
  return (
    <View style={$headerContainer}>
      {props.LeftAccessory}
      <Text style={[$headerTitle, props.titleStyle]}>{props.title}</Text>
      {props.RightAccessory}
    </View>
  );
}

const $headerContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: spacing[6],
};

const $headerTitle: TextStyle = {
  ...typography.title3,
  fontWeight: '500',
};
