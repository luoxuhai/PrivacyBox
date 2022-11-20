import React from 'react';
import { ScrollView, Text, ViewStyle } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { PurchaseBanner } from './PurchaseBanner';
import { Button, Screen, SafeAreaScrollView, ListCell, ListSection } from '@/components';
import { useTheme } from '@/theme/useTheme';
import { observer } from 'mobx-react-lite';
import { spacing } from '@/theme';

export const SettingScreen = observer(() => {
  const { colors, appearance, setAppearance } = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <Screen>
      <SafeAreaScrollView
        safeAreaProps={{
          edges: ['left', 'right'],
        }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingBottom: bottomTabBarHeight,
          paddingHorizontal: 20,
        }}
      >
        <PurchaseBanner />
        <ListSection titleTk="common.cancel">
          <ListCell text="xxx">x</ListCell>
          <ListCell text="xxx">x</ListCell>
          <ListCell text="xxx">33</ListCell>
        </ListSection>
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
      </SafeAreaScrollView>
    </Screen>
  );
});
