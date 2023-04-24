import File from '@/database/entities/file';
import { FileTypes } from '@/database/entities/types';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { DEFAULT_SIZE } from './constants';

import { getCoverComponent } from './helpers';

interface FileThumbnailProps {
  item: File;
  style?: StyleProp<ViewStyle>;
  width?: number | string;
  height?: number | string;
}

export const FileThumbnail = observer<FileThumbnailProps, any>(
  (props, ref) => {
    const { name, mime, type } = props.item;
    const isFolder = type === FileTypes.Folder;

    const CoverComponent = useMemo(
      () => getCoverComponent(isFolder, mime, name),
      [name, mime, isFolder],
    );

    const size: ViewStyle = {
      width: props.width ?? props.height ?? DEFAULT_SIZE,
      height: props.height ?? props.width ?? DEFAULT_SIZE,
    };

    return (
      <View style={[props.style, $container, size]} ref={ref}>
        <CoverComponent {...size} />
      </View>
    );
  },
  { forwardRef: true },
);

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};
