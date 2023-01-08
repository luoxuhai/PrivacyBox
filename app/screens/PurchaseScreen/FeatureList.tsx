import React from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View } from 'react-native';

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
  // {
  //   title: 'purchaseScreen.features.icloud',
  //   icon: 'arrow.clockwise.icloud.fill',
  // },
  {
    title: 'purchaseScreen.features.hideApp',
    icon: 'eye.slash.fill',
  },
  {
    title: 'purchaseScreen.features.fakeHome',
    icon: 'shield.righthalf.filled',
  },
  {
    title: 'purchaseScreen.features.transfer',
    icon: 'wifi.circle.fill',
  },
  {
    title: 'purchaseScreen.features.changeAppIcon',
    icon: 'app.gift.fill',
  },
  {
    title: 'purchaseScreen.features.scanDocument',
    icon: 'doc.viewfinder.fill',
  },
  {
    title: 'purchaseScreen.features.smartSearch',
    icon: 'magnifyingglass.circle.fill',
  },
  {
    title: 'purchaseScreen.features.keepDuration',
    icon: 'basket.fill',
  },
  {
    title: 'purchaseScreen.features.more',
    icon: 'ellipsis.circle.fill',
  },
];

const $featureListItem: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: spacing[5],
};

const $featureIcon: ViewStyle = {
  marginRight: spacing[6],
};

const $featureText: ViewStyle = {
  ...typography.body,
};

const $container: ViewStyle = {
  marginTop: spacing[12],
};
