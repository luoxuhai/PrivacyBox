import * as React from 'react';
import { Switch as RNSwitch, SwitchProps } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useTheme } from '@/theme';

export const Switch = observer(function Switch(props: SwitchProps) {
  const { colors } = useTheme();
  const color = colors.palette.primary6;

  return (
    <RNSwitch
      trackColor={{
        true: color,
      }}
      {...props}
    />
  );
});
