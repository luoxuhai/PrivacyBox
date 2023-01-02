import { FetchPhotosResult } from '@/services/local';
import { radius, useTheme } from '@/theme';
import React from 'react';
import { View } from 'react-native';
import { exists } from 'react-native-fs';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { useAsyncMemo } from '@/utils';
import { PhotoTypes } from '@/database/entities/types';

const ImageCorrupted = require('@/assets/images/corrupted-image.png');

interface PhotoThumbnailProps {
  item: FetchPhotosResult;
  style?: ImageStyle;
}

export function PhotoThumbnail(props: PhotoThumbnailProps) {
  const { thumbnail, poster, uri, type } = props.item;
  const { colors } = useTheme();

  const imageSource = useAsyncMemo(async () => {
    const availableThumbnail = await getAvailableThumbnail({ thumbnail, poster });

    if (availableThumbnail) {
      return { uri: availableThumbnail };
    }

    return type === PhotoTypes.Photo ? { uri } : ImageCorrupted;
  }, [thumbnail, poster, uri]);

  return (
    <FastImage
      style={[
        $image,
        props.style,
        {
          backgroundColor: colors.quaternaryFill,
        },
      ]}
      source={imageSource}
      resizeMode="cover"
    />
  );
}

export async function getAvailableThumbnail({
  thumbnail,
  poster,
}: Pick<FetchPhotosResult, 'thumbnail' | 'poster'>): Promise<string> {
  if (await exists(thumbnail)) {
    return thumbnail;
  }
  if (await exists(poster)) {
    return poster;
  }
}

const $image: ImageStyle = {
  flex: 1,
  borderRadius: radius[2],
};
