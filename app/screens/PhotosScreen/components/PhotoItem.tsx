import { radius } from '@/theme';
import React from 'react';
import { View } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

interface PhotoItemProps {
  item: any;
}

export function PhotoItem(props: PhotoItemProps) {
  return (
    <View>
      <FastImage
        style={$image}
        source={{
          uri: props.item.uri,
        }}
        resizeMode="cover"
      />
    </View>
  );
}

const $image: ImageStyle = {
  flex: 1,
  borderRadius: radius[4],
};
