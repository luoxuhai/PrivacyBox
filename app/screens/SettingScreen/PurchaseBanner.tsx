import React from 'react';
import { lightPalette, spacing, typography } from '@/theme';
import { StyleSheet, ViewStyle, View, TouchableOpacity, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { Button, Text } from '@/components';

interface PurchaseBannerProps {}

export function PurchaseBanner(props: PurchaseBannerProps) {
  const navigation = useNavigation();

  function handleToPurchase() {
    navigation.navigate('About');
  }

  return (
    <TouchableOpacity style={$container} activeOpacity={0.8} onPress={handleToPurchase}>
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
        <View>
          <Text style={$title} tk="settingsScreen.purchaseBanner.title" size="lg" />
          <Text style={$subtitle} tk="settingsScreen.purchaseBanner.subtitle" />
        </View>
        <Button
          style={$button}
          textStyle={$buttonText}
          tk="settingsScreen.purchaseBanner.button"
          onPress={handleToPurchase}
        />
      </View>
    </TouchableOpacity>
  );
}

const $container: ViewStyle = {
  width: '100%',
  height: 150,
  borderRadius: 14,
  overflow: 'hidden',
};

const $content: ViewStyle = {
  padding: spacing[5],
  flex: 1,
  justifyContent: 'space-between',
};

const $title: TextStyle = {
  color: lightPalette.white,
  ...typography.title3,
  fontWeight: '500',
};

const $subtitle: TextStyle = {
  ...typography.subhead,
  color: lightPalette.white,
  marginTop: spacing[5],
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
