import React from 'react';
import { Text, TextProps } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

interface GradientTextProps {
  textProps?: TextProps;
  linearGradientProps?: LinearGradientProps;
  children?: React.ReactNode;
}

export const GradientText = (props: GradientTextProps) => {
  return (
    <MaskedView maskElement={<Text {...props.textProps}>{props.children}</Text>}>
      <LinearGradient {...props.linearGradientProps}>
        <Text {...props.textProps} style={[props.textProps?.style, { opacity: 0 }]}>
          {props.children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};
