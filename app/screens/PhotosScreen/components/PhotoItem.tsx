import React, { useMemo } from 'react';
import { View, ViewStyle, Text, TextStyle, Pressable } from 'react-native';

import { FetchPhotosResult } from '@/services/local';
import { PhotoTypes } from '@/database/entities/types';
import { formatDuration } from '@/utils';
import { PhotoThumbnail } from '@/components';
import { SFSymbol } from 'react-native-sfsymbols';

interface PhotoItemProps {
  item: FetchPhotosResult;
  onPress?: (item: FetchPhotosResult) => void;
}

export function PhotoItem(props: PhotoItemProps) {
  return (
    <Pressable style={$container} onPress={() => props.onPress?.(props.item)}>
      <ICloudStatus item={props.item} />
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

function ICloudStatus({ item }: PhotoItemProps) {
  return <SFSymbol style={$iCloudStatus} name="checkmark.icloud" color="#FFF" />;
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

const $iCloudStatus: ViewStyle = {
  position: 'absolute',
  top: 4,
  right: 6,
  zIndex: 1,
  width: 26,
  height: 26,
  shadowOffset: {
    height: 3.5,
    width: 0,
  },
  shadowOpacity: 0.3,
  shadowRadius: 6.5,
};
