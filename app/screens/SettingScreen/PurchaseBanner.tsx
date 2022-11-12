import React from 'react';
import { StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Text } from '../../components';

interface PurchaseBannerProps {}

export function PurchaseBanner(props: PurchaseBannerProps) {
  return (
    <TouchableOpacity style={$container} activeOpacity={0.8}>
      <LinearGradient
        style={$background}
        start={{
          x: 0,
          y: 0,
        }}
        angle={135}
        colors={['rgb(0, 58, 247)', 'rgb(224, 0, 240)']}
      />
      <View style={$content}>
        <Text tk="common.ok">xx</Text>
        <Text>xx</Text>
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

const $content: ViewStyle = {};

const $background: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
};
