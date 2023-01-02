import { FetchPhotosResult } from '@/services/local';
import { radius } from '@/theme';
import React from 'react';
import { View } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

interface PhotoThumbnailProps {
  item: FetchPhotosResult;
  style?: ImageStyle;
}

export function PhotoThumbnail(props: PhotoThumbnailProps) {
  const { thumbnail, poster, uri } = props.item;

  const imageUri = uri || thumbnail || poster || uri;

  return (
    <View style={{ flex: 1 }}>
      <FastImage
        style={[$image, props.style]}
        source={{
          uri: imageUri,
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
