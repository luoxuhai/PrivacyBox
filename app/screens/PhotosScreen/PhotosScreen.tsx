import React, { FC, useCallback, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { AppStackParamList } from '@/navigators';
import { FlatGrid, Screen } from '@/components';
import {  useSafeAreaDimensions } from '@/utils';
import { ContextMenu } from './components/ContextMenu';
import { PhotoItem } from './components/PhotoItem';
import { ImportButton } from './components/ImportButton';
import { HeaderAlbumDetail } from './components/HeaderAlbumDetail';
import { photoKeys } from './constants';
import { useStores } from '@/models';
import { fetchPhotos } from '@/services/local';

export interface PhotosNavigatorParams {
  albumId: string;
  title?: string;
}

export const PhotosScreen: FC<StackScreenProps<AppStackParamList, 'Photos'>> = observer((props) => {
  const { albumId, title } = props.route.params;

  const safeAreaDimensions = useSafeAreaDimensions();
  const { landscape } = useDeviceOrientation();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => <HeaderAlbumDetail name={title} id={albumId} />,
    });
  }, [title, albumId]);

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

  const renderItem = useCallback(({ item }) => {
    return (
      <ContextMenu item={item}>
        <PhotoItem item={item} />
      </ContextMenu>
    );
  }, []);

  return (
    <Screen>
      <SafeAreaView style={$safeAreaView} edges={['left', 'right']}>
        <FlatGrid
          contentInsetAdjustmentBehavior="automatic"
          estimatedItemSize={150}
          itemWidth={landscape ? 120 : 110}
          autoHeight
          width={safeAreaDimensions.width}
          horizontalSpacingShown={false}
          itemWidthFixed={false}
          spacing={4}
          data={photos}
          renderItem={renderItem}
          refreshing={false}
          onRefresh={() => {}}
        />
      </SafeAreaView>
      <ImportButton albumId={'parentId'} />
    </Screen>
  );
});

const $safeAreaView: ViewStyle = {
  flex: 1,
};
