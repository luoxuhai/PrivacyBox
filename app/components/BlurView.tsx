import React from 'react';
import { VibrancyView, VibrancyViewProps } from '@react-native-community/blur';

export function BlurView(props: Partial<VibrancyViewProps>) {
  return <VibrancyView style={$blur} {...props} />;
}

const $blur = {
  flex: 1,
};
