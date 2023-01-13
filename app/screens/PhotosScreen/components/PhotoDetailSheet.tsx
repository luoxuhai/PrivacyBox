import React, { useRef } from 'react';
import { View, Text, ViewStyle, TextStyle, ScrollView, Pressable } from 'react-native';
import { observer } from 'mobx-react-lite';
import ActionSheet, { SheetProps, ActionSheetRef, SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, spacing, typography, useTheme } from '@/theme';
import { translate } from '@/i18n';
import { getPhotoTypeName } from '../helpers/getPhotoTypeName';
import { formatDate, formatDuration, formatSize, useDeepMemo } from '@/utils';
import { FetchPhotosResult } from '@/services/local';
import { PhotoTypes } from '@/database/entities/types';
import { ActionSheetHeader, ExitButton } from '@/components';

const t = translate;

interface FileDetailSheetProps extends SheetProps<{ item?: FetchPhotosResult }> {}

export const PhotoDetailSheet = observer<FileDetailSheetProps>((props) => {
  const { item } = props.payload;
  const { colors, isDark } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const list = useDeepMemo(() => getPhotoDetailList(item), [item]);

  return (
    <ActionSheet
      ref={actionSheetRef}
      id={props.sheetId}
      containerStyle={{
        borderTopLeftRadius: radius[10],
        borderTopRightRadius: radius[10],
        paddingBottom: safeAreaInsets.bottom,
        backgroundColor: isDark ? colors.secondaryBackground : colors.background,
        height: 360,
        paddingVertical: spacing[5],
      }}
      gestureEnabled={false}
      headerAlwaysVisible
      CustomHeaderComponent={
        <ActionSheetHeader
          title={t('filesScreen.detail.title')}
          titleStyle={{
            color: colors.label,
          }}
          RightAccessory={<ExitButton onPress={() => SheetManager.hide(props.sheetId)} />}
        />
      }
    >
      <ScrollView contentContainerStyle={$bottomSheetContent}>
        <Pressable>
          {list?.map((item) => (
            <View style={$listContainer} key={item.type}>
              <Text
                style={[
                  $label,
                  {
                    color: colors.label,
                  },
                ]}
              >
                {item.label}：
              </Text>

              <View style={$valueContainer}>
                <Text
                  selectable
                  ellipsizeMode="middle"
                  numberOfLines={item.numberOfLines ?? 2}
                  style={{ color: colors.label }}
                >
                  {item.value}
                </Text>
              </View>
            </View>
          ))}
        </Pressable>
      </ScrollView>
    </ActionSheet>
  );
});

function getPhotoDetailList(item: FetchPhotosResult) {
  const isVideo = item.type === PhotoTypes.Video;

  const resolution = isVideo ? item.video_details : item.image_details;

  return item
    ? [
        {
          type: 'name',
          label: t('filesScreen.detail.name'),
          value: item.name,
        },
        {
          type: 'type',
          label: t('filesScreen.detail.type'),
          value: getPhotoTypeName(item.type),
        },
        {
          type: 'size',
          label: t('filesScreen.detail.size'),
          value: formatSize(item.size),
        },
        {
          type: 'resolution',
          label: t('filesScreen.detail.resolution'),
          value: resolution.width ? `${resolution.width}x${resolution.height}` : '-',
        },
        isVideo && {
          type: 'duration',
          label: t('filesScreen.detail.duration'),
          value: formatDuration(item.video_details.duration),
        },
        {
          type: 'importTime',
          label: t('filesScreen.detail.importTime'),
          value: formatDate(item.created_date, 'YYYY-MM-DD HH:mm:ss'),
        },
        {
          type: 'ctime',
          label: t('filesScreen.detail.ctime'),
          value: formatDate(item.metadata.ctime, 'YYYY-MM-DD HH:mm:ss'),
        },
        {
          type: 'description',
          label: t('filesScreen.detail.description'),
          value: item.description || '-',
          numberOfLines: 10,
        },
        {
          type: 'labels',
          label: t('filesScreen.detail.labels'),
          value: item.labels?.zh_cn?.join('、') || '-',
        },
      ].filter((item) => item)
    : [];
}

const $bottomSheetContent: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingVertical: spacing[5],
};

const $listContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: 40,
};

const $label: TextStyle = {
  marginRight: 5,
  ...typography.callout,
};

const $valueContainer: ViewStyle = {
  flex: 1,
};
