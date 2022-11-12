import React from 'react';
import { Text, ScrollView, ViewStyle } from 'react-native';

import { PurchaseBanner } from './PurchaseBanner';
import { ScrollSafeAreaView } from '../../components';

export function SettingScreen() {
  return (
    <ScrollSafeAreaView style={$scrollView} safeAreaProps={{ edges: ['bottom', 'left', 'right'] }}>
      <PurchaseBanner />
      <Text>SettingScreen</Text>
    </ScrollSafeAreaView>
  );
}

const $scrollView: ViewStyle = {
  flex: 1,
};
