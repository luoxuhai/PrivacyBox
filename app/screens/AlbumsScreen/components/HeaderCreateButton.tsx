import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';
import { useAlbumCreator } from '../helpers/useAlbumCreator';

export function HeaderCreateButton() {
  const { openAlert } = useAlbumCreator();

  return (
    <TouchableOpacity
      style={{
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={openAlert}
    >
      <SFSymbol size={26} name="plus.circle.fill" />
    </TouchableOpacity>
  );
}
