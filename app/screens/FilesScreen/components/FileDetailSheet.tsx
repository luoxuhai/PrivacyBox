import React, { useMemo, useRef } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import ActionSheet, { SheetProps, ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, spacing, typography, useTheme } from '@/theme';
import { translate } from '@/i18n';
import { SafeAreaScrollView } from '@/components';
import { FetchFilesResult } from '@/services/local/file';
import { FileTypes } from '@/database/entities/types';
import { getFileTypeName } from '../helpers/getFileTypeName';
import { formatDate, formatSize } from '@/utils';

const t = translate;

interface FileDetailSheetProps extends SheetProps<{ item?: FetchFilesResult }> {}

export const FileDetailSheet = observer<FileDetailSheetProps>((props) => {
  const { item } = props.payload;
  const { colors, isDark } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const list = useMemo(() => getFileDetailList(item), [item]);

  return (
    <ActionSheet
      ref={actionSheetRef}
      id={props.sheetId}
      containerStyle={{
        borderTopLeftRadius: radius[10],
        borderTopRightRadius: radius[10],
        paddingBottom: safeAreaInsets.bottom,
        backgroundColor: isDark ? colors.secondaryBackground : colors.background,
        height: 240,
      }}
      indicatorStyle={{
        width: 80,
        backgroundColor: colors.tertiaryFill,
      }}
      gestureEnabled={true}
    >
      <SafeAreaScrollView contentContainerStyle={$bottomSheetContent}>
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
                numberOfLines={2}
                style={{ color: colors.label }}
              >
                {item.value}
              </Text>
            </View>
          </View>
        ))}
      </SafeAreaScrollView>
    </ActionSheet>
  );
});

function getFileDetailList(item: FetchFilesResult) {
  const isFolder = item?.type === FileTypes.Folder;

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
          value: getFileTypeName(item.type),
        },
        !isFolder && {
          type: 'size',
          label: t('filesScreen.detail.size'),
          value: formatSize(item.size),
        },
        {
          type: 'ctime',
          label: t('filesScreen.detail.ctime'),
          value: formatDate(item.created_date, 'YYYY-MM-DD HH:mm:ss'),
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
  height: 40,
};

const $label: TextStyle = {
  marginRight: 5,
  ...typography.callout,
};

const $valueContainer: ViewStyle = {
  flex: 1,
};
