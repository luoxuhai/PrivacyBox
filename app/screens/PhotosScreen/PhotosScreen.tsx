import React, { FC, useCallback, useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { AppStackParamList } from '@/navigators';
import { FlatGrid, ContentStyle, Screen } from '@/components';
import { useSafeAreaDimensions } from '@/utils';
import { ContextMenu } from './components/ContextMenu';
import { PhotoItem } from './components/PhotoItem';
import { ImportButton } from './components/ImportButton';
import { HeaderAlbumDetail } from './components/HeaderAlbumDetail';
import { photoKeys } from './constants';
import { useStores } from '@/models';
import { fetchPhotos, FetchPhotosResult } from '@/services/local';
import { spacing } from '@/theme';
import { MoreButton } from './components/MoreButton';
import {
  PhotoSettingsContextProvider,
  PhotoSettingsContextValue,
  PhotoSettingsInitialValue,
} from './context';

export interface PhotosNavigatorParams {
  albumId: string;
  title?: string;
}

export const PhotosScreen: FC<StackScreenProps<AppStackParamList, 'Photos'>> = observer((props) => {
  const { albumId, title } = props.route.params;
  const [photoSettings, setPhotoSettings] =
    useState<PhotoSettingsContextValue>(PhotoSettingsInitialValue);

  const safeAreaDimensions = useSafeAreaDimensions();
  const { landscape } = useDeviceOrientation();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  // 顶部导航栏
  useEffect(() => {
    props.navigation?.setOptions({
      headerTitle: () => <HeaderAlbumDetail name={title} id={albumId} />,
      headerRight: () => (
        <PhotoSettingsContextProvider value={photoSettings}>
          <MoreButton onSort={setPhotoSettings} />
        </PhotoSettingsContextProvider>
      ),
    });
  }, [title, albumId, photoSettings]);

  const { data: photos, isLoading } = useQuery({
    queryKey: photoKeys.list(`${inFakeEnvironment}:${albumId}`),
    queryFn: async () => {
      return await fetchPhotos({
        is_fake: inFakeEnvironment,
        parent_id: albumId,
      });
    },
    enabled: true,
  });

  const renderItem = useCallback(({ item }: { item: FetchPhotosResult }) => {
    return (
      <ContextMenu item={item}>
        <PhotoItem
          item={item}
          onPress={() => {
            props.navigation.push('PhotoViewer');
          }}
        />
      </ContextMenu>
    );
  }, []);

  return (
    <Screen>
      <SafeAreaView style={$safeAreaView} edges={['left', 'right', 'bottom']}>
        <FlatGrid
          contentContainerStyle={$contentContainerStyle}
          contentInsetAdjustmentBehavior="automatic"
          estimatedItemSize={150}
          itemWidth={landscape ? 120 : 110}
          autoHeight
          width={safeAreaDimensions.width}
          itemWidthFixed={false}
          spacing={2}
          data={photos}
          renderItem={renderItem}
        />
      </SafeAreaView>
      <ImportButton albumId={albumId} />
    </Screen>
  );
});

const $safeAreaView: ViewStyle = {
  flex: 1,
};

const $contentContainerStyle: ContentStyle = {
  paddingTop: spacing[4],
};
