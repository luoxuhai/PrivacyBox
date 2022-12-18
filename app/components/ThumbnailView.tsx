import React, { useMemo } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Blurhash } from 'react-native-blurhash';

interface ThumbnailViewProps {
  blurhash?: string;
}

export function ThumbnailView(props: ThumbnailViewProps) {
  return (
    <View>
      <Blurhash blurhash={props.blurhash} style={$blurhash} />
    </View>
  );
}

const $blurhash: ViewStyle = {
  flex: 1,
};
