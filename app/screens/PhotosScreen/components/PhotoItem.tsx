import React, { useMemo } from 'react';
import { View, ViewStyle, Text, TextStyle, Pressable } from 'react-native';

import { FetchPhotosResult } from '@/services/local';
import { PhotoTypes } from '@/database/entities/types';
import { formatDuration } from '@/utils';
import { PhotoThumbnail } from '@/components';

interface PhotoItemProps {
  item: FetchPhotosResult;
  onPress?: (item: FetchPhotosResult) => void;
  onLongPress?: () => void;
}

export function PhotoItem(props: PhotoItemProps) {
  return (
    <Pressable
      style={$container}
      delayLongPress={200}
      onPress={() => props.onPress?.(props.item)}
      onLongPress={props.onLongPress}
    >
      <PhotoThumbnail item={props.item} />
      <ExtraInfo item={props.item} />
    </Pressable>
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
  textShadowColor: '#777',
  textShadowRadius: 2,
};
