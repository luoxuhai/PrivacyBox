import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { observer } from 'mobx-react-lite';

import { useTheme } from '@/theme';
import { translate } from '@/i18n';

interface EmptyStateProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
}

export const EmptyState = observer<EmptyStateProps>((props) => {
  const { colors } = useTheme();

  return (
    <View style={[$container, props.style]}>
      <Text
        style={[
          $text,
          {
            color: colors.secondaryLabel,
          },
        ]}
      >
        {props.text ?? translate('common.noData')}
      </Text>
    </View>
  );
});

const $container: ViewStyle = {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
};

const $text: TextStyle = {
  fontSize: 20,
  fontWeight: '500',
};
