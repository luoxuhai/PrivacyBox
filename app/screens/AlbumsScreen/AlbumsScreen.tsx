import React, { FC, useCallback, useEffect, useRef } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQuery } from '@tanstack/react-query';

import { AlbumsNavigatorParamList } from '@/navigators';
import { Screen, FlatGrid } from '@/components';
import { AlbumItem } from './components/AlbumItem';
import { HeaderCreateButton } from './components/HeaderCreateButton';
import {
  PhotoSearchPanel,
  PhotoSearchPanelInstance,
} from './components/PhotoSearchPanel/PhotoSearchPanel';
import { useAlbumEditor } from './helpers/useAlbumEditor';
import { useRefreshOnFocus, useSafeAreaDimensions } from '@/utils';
import { fetchAlbums } from '@/services/local';
import { albumKeys, headerSearchBarOptions } from './constants';
import { useStores } from '@/models';

export const AlbumsScreen: FC<NativeStackScreenProps<AlbumsNavigatorParamList, 'Album'>> = observer(
  (props) => {
    const {
      appLockStore: { inFakeEnvironment },
    } = useStores();
    const bottomTabBarHeight = useBottomTabBarHeight();
    const safeAreaDimensions = useSafeAreaDimensions();
    const { onOpenActionSheet } = useAlbumEditor();
    const searchPanelRef = useRef<PhotoSearchPanelInstance>(null);

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: HeaderCreateButton,
        headerSearchBarOptions: {
          ...headerSearchBarOptions,
          onChangeText: (event) => searchPanelRef.current?.search(event.nativeEvent.text),
          onCancelButtonPress: searchPanelRef.current?.hide,
          onFocus: searchPanelRef.current?.show,
        },
      });
    }, [searchPanelRef.current]);

    const {
      isFetching,
      data: albums,
      refetch,
    } = useQuery({
      queryKey: albumKeys.list({ inFakeEnvironment }),
      queryFn: async () => {
        return await fetchAlbums({
          is_fake: inFakeEnvironment,
        });
      },
      placeholderData: [],
      enabled: true,
    });

    useRefreshOnFocus(refetch);

    const renderItem = useCallback(
      ({ item }) => {
        return (
          <AlbumItem
            item={item}
            onPress={() => {
              props.navigation.navigate('Photos', {
                albumId: item.id,
                title: item.name,
              });
            }}
            onOpenEditor={() => onOpenActionSheet(item)}
          />
        );
      },
      [onOpenActionSheet],
    );

    return (
      <Screen>
        <SafeAreaView style={$safeAreaView} edges={['left', 'right']}>
          <FlatGrid
            contentContainerStyle={{
              paddingBottom: bottomTabBarHeight,
            }}
            isLoading={isFetching}
            contentInsetAdjustmentBehavior="automatic"
            estimatedItemSize={150}
            itemWidth={150}
            width={safeAreaDimensions.width}
            itemWidthFixed={false}
            spacing={26}
            data={albums}
            renderItem={renderItem}
          />
        </SafeAreaView>
        <PhotoSearchPanel ref={searchPanelRef} />
      </Screen>
    );
  },
);

const $safeAreaView: ViewStyle = {
  flex: 1,
};
