import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, StyleSheet, TextStyle } from 'react-native';
import { useQuery } from 'react-query';
import { Product } from 'react-native-iap';

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
            <SettingsIcon
              style={$featureIcon}
              systemName={item.icon}
              color="#EED198"
              backgroundColor="#FCF6E9"
            />
            <Text style={$featureText} tk={item.title} color={colors.label} />
          </View>
        );
      })}
    </View>
  );
});

const list: { title: TextKeyPath; icon: string }[] = [
  {
    title: 'purchaseScreen.features.transfer',
    icon: 'icloud.fill',
  },
  {
    title: 'purchaseScreen.features.changeAppIcon',
    icon: 'icloud.fill',
  },
  {
    title: 'purchaseScreen.features.scanDocument',
    icon: 'icloud.fill',
  },
  {
    title: 'purchaseScreen.features.smartSearch',
    icon: 'icloud.fill',
  },
  {
    title: 'purchaseScreen.features.keepDuration',
    icon: 'icloud.fill',
  },
  {
    title: 'purchaseScreen.features.more',
    icon: 'icloud.fill',
  },
];

const $featureListItem: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: spacing[6],
};

const $featureIcon: ViewStyle = {
  marginRight: spacing[7],
};

const $featureText: ViewStyle = {
  ...typography.body,
};

const $container: ViewStyle = {
  marginTop: spacing[12],
};
