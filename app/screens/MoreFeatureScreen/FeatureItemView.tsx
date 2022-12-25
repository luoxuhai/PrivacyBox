import React from 'react';
import { Text, View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';
import { TextKeyPath, translate } from '@/i18n';
import { SFSymbol } from 'react-native-sfsymbols';
import { MoreFeatureNavigatorParamList } from '@/navigators';

export interface FeatureItem {
  title: TextKeyPath;
  subtitle?: TextKeyPath;
  icon: string;
  color: string;
  needPremium?: boolean;
  routeName?: keyof MoreFeatureNavigatorParamList;
}

interface FeatureItemViewProps extends FeatureItem {
  onPress(): void;
}

const iconProps = {
  color: '#FFF',
  width: 36,
  height: 36,
};

export function FeatureItemView(props: FeatureItemViewProps): JSX.Element {
  return (
    <TouchableOpacity style={$cardItem} onPress={props.onPress} activeOpacity={0.8}>
      <View style={[$cardItemBody, { backgroundColor: props.color }]}>
        <SFSymbol name={props.icon} {...iconProps} />
        <View>
          <Text style={$cardItemText}>{translate(props.title)}</Text>
          {props.subtitle && (
            <Text numberOfLines={2} style={$subtitle}>
              {translate(props.subtitle)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const $cardItem: ViewStyle = {
  flex: 1,
  height: 110,
  borderRadius: radius[3],
};

const $cardItemBody: ViewStyle = {
  flex: 1,
  borderRadius: 12,
  justifyContent: 'space-between',
  padding: spacing[4],
};

const $cardItemText: TextStyle = {
  fontSize: 16,
  fontWeight: '500',
  color: '#fff',
};

const $subtitle: TextStyle = {
  ...typography.caption1,
  color: colors.light.palette.gray6,
  marginTop: spacing[2],
  lineHeight: 14,
};
