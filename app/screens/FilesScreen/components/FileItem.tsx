import React from 'react';
import { Text, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';

import { useTheme } from '@/theme';
import { FileThumbnail } from './FileThumbnail/FileThumbnail';
import { translate } from '@/i18n';
import { FileTypes } from '@/database/entities/types';
import { FetchFilesResult } from '@/services/local/file';
import { formatDate } from '@/utils';

interface AlbumItemProps {
  item: FetchFilesResult;
  onOpen: (item: any) => void;
  onLongPress: () => void;
}

export const FileItem = observer<AlbumItemProps>(
  (props, ref) => {
    const { colors } = useTheme();

    return (
      <TouchableOpacity
        style={[
          $container,
          {
            backgroundColor: colors.background,
          },
        ]}
        activeOpacity={0.7}
        delayLongPress={200}
        onPress={props.onOpen}
        onLongPress={props.onLongPress}
      >
        <FileThumbnail ref={ref} item={props.item} width="90%" height={90} />
        <Text
          style={[
            $name,
            {
              color: colors.label,
            },
          ]}
          ellipsizeMode="middle"
          numberOfLines={2}
        >
          {props.item.name}
        </Text>
        <Text
          style={[
            $time,
            {
              color: colors.secondaryLabel,
            },
          ]}
        >
          {props.item.type === FileTypes.Folder
            ? `${props.item.item_count ?? 0} ${translate('filesScreen.items')}`
            : formatDate(props.item.created_date)}
        </Text>
      </TouchableOpacity>
    );
  },
  {
    forwardRef: true,
  },
);

const $container: ViewStyle = {
  flexDirection: 'column',
  alignItems: 'center',
  height: 160,
  paddingHorizontal: 5,
  paddingVertical: 4,
};

const $name: TextStyle = {
  fontSize: 14,
  marginVertical: 6,
  textAlign: 'center',
};

const $time: TextStyle = {
  fontSize: 12,
};
