import React from 'react';
import { Text, ViewStyle } from 'react-native';

import { PurchaseBanner } from './PurchaseBanner';
import { Button, Screen } from '@/components';
import { useTheme } from '@/theme/useTheme';
import { observer } from 'mobx-react-lite';

export const SettingScreen = observer(() => {
  const { colors, appearance, setAppearance } = useTheme();
  return (
    <Screen style={$scrollView} preset='scroll' safeAreaEdges={['bottom', 'left', 'right']}>
      <PurchaseBanner />
      <Text
        style={{
          color: colors.palette.primary6,
        }}
      >
        {appearance}
      </Text>
      <Button
        text="Dark"
        onPress={() => {
          setAppearance(appearance === 'dark' ? 'light' : 'dark');
        }}
      ></Button>
    </Screen>
  );
});

const $scrollView: ViewStyle = {
  flex: 1,
};
