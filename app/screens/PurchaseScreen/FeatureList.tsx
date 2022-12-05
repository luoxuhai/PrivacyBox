import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, StyleSheet, TextStyle } from 'react-native';

import { Text, SettingsIcon } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { TextKeyPath } from '@/i18n';

export const FeatureList = observer(() => {
  const { colors } = useTheme();

  return (
    <View style={$container}>
      {list.map((item) => {
        return (
          <View key={item.title} style={$featureListItem}>
            <SettingsIcon style={$featureIcon} systemName="icloud.fill" backgroundColor="#F00" />
            <Text style={$featureText} text="xxx" color={colors.label} />
          </View>
        );
      })}
    </View>
  );
});

const list: { title: TextKeyPath; icon: JSX.Element }[] = [
  {
    title: '',
    icon: 'x',
  },
  {
    title: '',
    icon: 'x',
  },
  {
    title: '',
    icon: 'x',
  },
  {
    title: '',
    icon: 'x',
  },
];

const $featureListItem: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: spacing[4],
};

const $featureIcon: ViewStyle = {
  marginRight: spacing[4],
};

const $featureText: ViewStyle = {
  ...typography.body,
};

const $container: ViewStyle = {
  marginTop: spacing[10],
};
