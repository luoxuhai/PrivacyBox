import React, { FC, useState } from 'react';
import { ViewStyle, View, TouchableHighlight, TextStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SFSymbol } from 'react-native-sfsymbols';
import { useDeviceOrientation } from '@react-native-community/hooks';

import { Text } from '@/components';
import { typography, useTheme } from '@/theme';
import { HapticFeedback } from '@/utils';

export const KEY_SIZE = 78;
const KEY_MIN_PADDING = 10;
const pressKeySize = KEY_SIZE + KEY_MIN_PADDING * 2;

interface PasscodeKeyboardProps {
  Accessory?: React.ReactNode;
  hideDeleteKey?: boolean;
  onChange?(value: string): void;
  onDelete?(): void;
}

export const PasscodeKeyboard: FC<PasscodeKeyboardProps> = observer((props) => {
  const { colors } = useTheme();
  const { portrait } = useDeviceOrientation();

  const keys = Array.from({ length: 9 }, (_, i) => String(i + 1));

  const passcodeKeyboardStyles: ViewStyle[] = [
    $passcodeKeyboard,
    {
      width: (pressKeySize + (portrait ? 6 : 0)) * 3,
      height: pressKeySize * 4,
      alignContent: portrait ? 'flex-start' : 'center',
    },
  ];

  return (
    <View style={passcodeKeyboardStyles}>
      {keys.map((key) => (
        <PressKey key={key} name={key} onPress={props.onChange} />
      ))}
      <PressKeyContainer>{props.Accessory}</PressKeyContainer>
      <PressKey name="0" onPress={props.onChange} />
      {props.hideDeleteKey ? (
        <PressKeyContainer />
      ) : (
        <PressKey name="delete" onPress={props.onDelete}>
          <SFSymbol name="delete.left" color={colors.label} size={KEY_SIZE / 2.5} />
        </PressKey>
      )}
    </View>
  );
});

interface PressKeyProps {
  name?: string;
  children?: React.ReactNode;
  onPress?(key: string): void;
}

const PressKey = observer<PressKeyProps>((props) => {
  const [isPressed, setIsPressed] = useState(false);
  const { colors } = useTheme();

  return (
    <PressKeyContainer>
      <TouchableHighlight
        style={[
          $pressKey,
          {
            borderWidth: isPressed ? 0 : 1,
            borderColor: colors.quaternaryLabel,
          },
        ]}
        underlayColor={colors.fill}
        onPress={() => {
          props.onPress(props.name);
          HapticFeedback.selection();
        }}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        {props.children || (
          <Text style={$pressKeyText} color={colors.label}>
            {props.name}
          </Text>
        )}
      </TouchableHighlight>
    </PressKeyContainer>
  );
});

function PressKeyContainer(props: { children?: React.ReactNode }) {
  const { portrait } = useDeviceOrientation();

  return (
    <View
      style={[
        $pressKeyContainer,
        {
          width: pressKeySize,
          height: pressKeySize + (portrait ? 0 : -10),
        },
      ]}
    >
      {props.children}
    </View>
  );
}

const $passcodeKeyboard: ViewStyle = {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const $pressKeyContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: KEY_MIN_PADDING,
};

const $pressKey: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  width: KEY_SIZE,
  height: KEY_SIZE,
  borderRadius: KEY_SIZE / 2,
};

const $pressKeyText: TextStyle = {
  ...typography.title2,
};
