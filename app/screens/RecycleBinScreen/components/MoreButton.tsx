import React from 'react';
import { TouchableOpacity, ViewStyle, View } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

import { TextButton } from '@/components';
import { spacing } from '@/theme';
import { RootNavigation } from '@/navigators';

interface MoreButtonProps {
  visible: boolean;
  selectVisible: boolean;
  onSelect?: () => void;
}

export function MoreButton(props: MoreButtonProps) {
  if (!props.visible) {
    return null;
  }

  return (
    <View style={$container}>
      {props.selectVisible && (
        <TextButton style={$button} tk="filesScreen.select" onPress={props.onSelect} />
      )}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          RootNavigation.navigate('RecycleBinSettings');
        }}
      >
        <SFSymbol style={$icon} size={24} name="slider.horizontal.3" />
      </TouchableOpacity>
    </View>
  );
}

const $container: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $button: ViewStyle = {
  marginRight: spacing[4],
};

const $icon: ViewStyle = {
  width: 34,
  height: 34,
};
