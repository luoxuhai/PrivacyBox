import { RootNavigation } from '@/navigators';
import { spacing } from '@/theme';
import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';
import { useAlbumCreator } from '../helpers/useAlbumCreator';

export function HeaderRightButton() {
  const { openAlert } = useAlbumCreator();

  return (
    <View style={$container}>
      <TouchableOpacity style={$iconContainer} onPress={openAlert}>
        <SFSymbol style={$icon} name="plus.circle.fill" />
      </TouchableOpacity>
      <TouchableOpacity
        style={$iconICloudContainer}
        onPress={() => {
          RootNavigation.navigate('ICloudBackup');
        }}
      >
        <SFSymbol
          name="arrow.clockwise.icloud.fill"
          style={{
            width: 32,
            height: 32,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const $container: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $iconContainer: ViewStyle = {
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
};

const $iconICloudContainer: ViewStyle = {
  ...$iconContainer,
  marginLeft: spacing[3],
};

const $icon: ViewStyle = {
  width: 28,
  height: 28,
};
