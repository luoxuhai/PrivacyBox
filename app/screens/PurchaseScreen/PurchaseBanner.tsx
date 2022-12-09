import React from 'react';
import { lightPalette, spacing, typography } from '@/theme';
import { StyleSheet, ViewStyle, View, TouchableOpacity, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, Text, LottieView } from '@/components';
import { SettingStackParamList } from '@/navigators';
import { useStores } from '@/models';

export const PurchaseBanner = observer(() => {
  const {
    purchaseStore: { isPurchased },
  } = useStores();
  const navigation = useNavigation<StackNavigationProp<SettingStackParamList, 'Purchase'>>();

  function handleToPurchase() {
    navigation.navigate('Purchase');
  }

  return (
    <TouchableOpacity
      style={[$container, isPurchased && $compactContainer]}
      activeOpacity={0.8}
      onPress={handleToPurchase}
    >
      <LinearGradient
        style={$background}
        start={{
          x: 0,
          y: 0,
        }}
        angle={135}
        colors={['#C644FC', '#5856D6']}
      />
      <View style={$content}>
        <View style={isPurchased && $compactTextContainer}>
          <View style={$titleContainer}>
            <Text style={$title} tk="settingsScreen.purchaseBanner.title" size="lg" />
            <LottieView source="Pro" autoPlay loop />
          </View>
          <Text
            style={[$subtitle, isPurchased && $compactSubtitle]}
            tk={
              isPurchased
                ? 'settingsScreen.purchaseBanner.purchasedSubtitle'
                : 'settingsScreen.purchaseBanner.subtitle'
            }
          />
        </View>
        {isPurchased ? null : (
          <Button
            style={$button}
            textStyle={$buttonText}
            tk="settingsScreen.purchaseBanner.button"
            onPress={handleToPurchase}
          />
        )}
      </View>
    </TouchableOpacity>
  );
});

const $container: ViewStyle = {
  width: '100%',
  height: 150,
  borderRadius: 14,
  overflow: 'hidden',
};

const $compactContainer: ViewStyle = {
  height: 90,
};

const $content: ViewStyle = {
  padding: spacing[5],
  flex: 1,
  justifyContent: 'space-between',
};

const $compactTextContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
};

const $titleContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $title: TextStyle = {
  color: lightPalette.white,
  ...typography.title3,
  fontWeight: '500',
  marginRight: spacing[2],
};

const $subtitle: TextStyle = {
  ...typography.subhead,
  color: lightPalette.white,
  marginTop: spacing[5],
};

const $compactSubtitle: ViewStyle = {
  marginTop: spacing[3],
  ...typography.footnote,
};

const $background: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
};

const $button: ViewStyle = {
  width: 88,
  height: 30,
  borderRadius: 15,
};

const $buttonText: TextStyle = {
  ...typography.subhead,
  fontWeight: '400',
};
