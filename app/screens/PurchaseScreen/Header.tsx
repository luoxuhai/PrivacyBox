import React from 'react';
import { observer } from 'mobx-react-lite';
import { TextStyle, View, ViewStyle } from 'react-native';

import { GradientText } from '@/components';
import { spacing, typography } from '@/theme';
import { translate } from '@/i18n';

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
        {translate('purchaseScreen.title')}
      </GradientText>
      <GradientText
        textProps={{
          style: [$title, { marginTop: spacing[3] }],
        }}
        linearGradientProps={linearGradientProps}
      >
        {translate('purchaseScreen.subtitle')}
      </GradientText>
    </View>
  );
});

const $container: ViewStyle = {
  marginTop: spacing[6],
};

const $title: TextStyle = {
  ...typography.title2,
  fontWeight: '600',
};
