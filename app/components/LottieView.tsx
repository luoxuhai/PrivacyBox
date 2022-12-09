import React from 'react';
import Lottie, { AnimatedLottieViewProps } from 'lottie-react-native';

export type LottieSourceTypes = keyof typeof lottieRegistry;

interface LottieViewProps extends AnimatedLottieViewProps {
  source: LottieSourceTypes;
}

export const LottieView = (props: LottieViewProps) => {
  return <Lottie {...props} />;
};

export const lottieRegistry = {
  Pro: require('@/assets/lotties/Pro.json'),
};
