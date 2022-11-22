import React, { FC } from 'react';
import { ScrollView, Text, ViewStyle } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { PurchaseBanner } from './PurchaseBanner';
import { Button, Screen, SafeAreaScrollView, ListCell, ListSection } from '@/components';
import { useTheme } from '@/theme/useTheme';
import { observer } from 'mobx-react-lite';
import { spacing } from '@/theme';
import { SettingStackParamList } from '@/navigators';

export const SettingScreen: FC<StackScreenProps<SettingStackParamList, 'Settings'>> = observer(
  (props) => {
    const { colors, appearance } = useTheme();
    const bottomTabBarHeight = useBottomTabBarHeight();

    const $contentContainerStyles = [
      $contentContainer,
      {
        paddingBottom: bottomTabBarHeight,
      },
    ];

    return (
      <Screen>
        <SafeAreaScrollView contentContainerStyle={$contentContainerStyles}>
          <PurchaseBanner />
          <ListSection titleTk="common.cancel">
            <ListCell
              tk="appearanceScreen.title"
              onPress={() => {
                props.navigation.navigate('Appearance');
              }}
            />
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
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

const $contentContainer: ViewStyle = {
  paddingTop: spacing[6],
  paddingHorizontal: spacing[6],
};
