import React from 'react';
import { observer } from 'mobx-react-lite';
import { TextStyle, View, ViewStyle } from 'react-native';

import { GradientText } from '@/components';
import { spacing, typography } from '@/theme';

const linearGradientProps = {
  start: {
    x: 0,
    y: 0,
  },
  colors: ['#C644FC', '#5856D6'],
};

export const Header = observer(() => {
  return (
    <View style={$container}>
      <GradientText
        textProps={{
          style: $title,
        }}
        linearGradientProps={linearGradientProps}
      >
        隐私盒子高级版
      </GradientText>
      <GradientText
        textProps={{
          style: [$title, { marginTop: spacing[3] }],
        }}
        linearGradientProps={linearGradientProps}
      >
        完整的功能体验
      </GradientText>
    </View>
  );
});

const $container: ViewStyle = {
  marginTop: spacing[4],
};

const $title: TextStyle = {
  ...typography.title3,
  fontWeight: '500',
};
