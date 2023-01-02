import React, { useMemo } from 'react';
import { View, ViewStyle, Text, TextStyle } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';

import { radius } from '@/theme';
import { FetchPhotosResult } from '@/services/local';
import { PhotoTypes } from '@/database/entities/types';
import { formatDuration } from '@/utils';
import { PhotoThumbnail } from '@/components';

interface PhotoItemProps {
  item: FetchPhotosResult;
}

export function PhotoItem(props: PhotoItemProps) {
  return (
    <View style={$container}>
      <PhotoThumbnail item={props.item} />
      <ExtraInfo item={props.item} />
    </View>
  );
}

function ExtraInfo({ item }: PhotoItemProps) {
  const { duration } = item.video_details ?? {};
  const durationStr = useMemo(() => formatDuration(duration), [duration]);

  return (
    <View style={$extraInfo}>
      {item.type === PhotoTypes.Video ? <Text style={$duration}>{durationStr}</Text> : null}
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
};

const $image: ImageStyle = {
  flex: 1,
  borderRadius: radius[4],
};

const $extraInfo: ViewStyle = {
  position: 'absolute',
  bottom: 4,
  right: 6,
  flexDirection: 'row',
  justifyContent: 'flex-end',
};

const $duration: TextStyle = {
  fontSize: 12,
  fontWeight: '600',
  color: '#FFF',
  textShadowColor: '#888',
  textShadowRadius: 1,
};
