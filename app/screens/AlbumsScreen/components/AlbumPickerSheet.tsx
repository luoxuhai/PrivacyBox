import React, { useCallback, useRef } from 'react';
import { ViewStyle } from 'react-native';
import ActionSheet, { SheetProps, ActionSheetRef, SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useQuery } from '@tanstack/react-query';

import { radius, spacing, useTheme } from '@/theme';
import {
  ActionSheetHeader,
  ExitButton,
  ListCell,
  ListSection,
  SafeAreaScrollView,
} from '@/components';
import { albumKeys } from '../constants';
import { useStores } from '@/models';
import { fetchAlbums, FetchAlbumsResult } from '@/services/local';
import { t } from '@/i18n';

interface AlbumPickerSheetProps extends SheetProps {}

export const AlbumPickerSheet = observer<AlbumPickerSheetProps>((props) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { colors } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  const { data: albums } = useQuery({
    queryKey: albumKeys.list({ inFakeEnvironment }),
    placeholderData: [],
    queryFn: async () => {
      return await fetchAlbums({
        is_fake: inFakeEnvironment,
      });
    },
    enabled: true,
  });

  const handleDone = useCallback((albumId?: string) => {
    SheetManager.hide(props.sheetId, {
      payload: albumId,
    });
  }, []);

  return (
    <ActionSheet
      ref={actionSheetRef}
      id={props.sheetId}
      containerStyle={{
        paddingBottom: safeAreaInsets.bottom,
        backgroundColor: colors.secondaryBackground,
        ...$containerStyle,
      }}
      CustomHeaderComponent={<HeaderComponent onPress={handleDone} />}
      gestureEnabled={false}
      headerAlwaysVisible
    >
      <SafeAreaScrollView style={$scrollView} contentContainerStyle={$contentContainerStyle}>
        <ListSection
          style={{
            marginVertical: 0,
          }}
        >
          {albums.map((album, index) => (
            <AlbumItem
              key={album.id}
              bottomSeparator={index < albums.length - 1}
              item={album}
              onPress={handleDone}
            />
          ))}
        </ListSection>
      </SafeAreaScrollView>
    </ActionSheet>
  );
});

interface HeaderComponentProps {
  onPress: () => void;
}

function HeaderComponent(props: HeaderComponentProps) {
  const { colors } = useTheme();

  return (
    <ActionSheetHeader
      title={t('photosScreen.moveToAlbum.fail')}
      titleStyle={{
        color: colors.label,
      }}
      RightAccessory={<ExitButton onPress={() => props.onPress()} />}
    />
  );
}

function AlbumItem({
  item,
  bottomSeparator,
  onPress,
}: {
  item: FetchAlbumsResult;
  bottomSeparator: boolean;
  onPress: (albumId: string) => void;
}) {
  const { colors, isDark } = useTheme();

  return (
    <ListCell
      style={{
        backgroundColor: isDark ? colors.quaternaryFill : colors.background,
      }}
      text={item.name}
      rightIcon={null}
      RightAccessory={String(item.item_count)}
      onPress={() => onPress(item.id)}
      bottomSeparator={bottomSeparator}
    />
  );
}

const $containerStyle: ViewStyle = {
  height: 350,
  borderTopLeftRadius: radius[10],
  borderTopRightRadius: radius[10],
  paddingVertical: spacing[5],
};

const $scrollView: ViewStyle = {
  flex: 1,
  marginTop: spacing[6],
};

const $contentContainerStyle: ViewStyle = {
  paddingHorizontal: spacing[6],
};
