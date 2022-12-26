import React, { FC, useCallback, useEffect } from 'react';
import { TouchableOpacity, ViewStyle, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SFSymbol } from 'react-native-sfsymbols';
import { useQuery } from '@tanstack/react-query';

import { AlbumsNavigatorParamList } from '@/navigators';
import { Screen, FlatGrid, LoadState, EmptyState } from '@/components';
import { useTheme } from '@/theme';
import { AlbumItem } from './AlbumItem';
import { useAlbumEditor } from './useAlbumEditor';
import { useAlbumCreator } from './useAlbumCreator';
import { useSafeAreaDimensions, delay } from '@/utils';

import { fetchAlbums } from '@/services/local';
import { albumKeys } from './constants';
import { useStores } from '@/models';

const DATA = Array.from(
  {
    length: 10,
  },
  (_, i) => ({
    name: '小视频🐒' + (i + 1),
    code: '#1abc9c',
    id: i,
    count: i * 10,
    src: 'https://content.shopback.com/tw/wp-content/uploads/2018/11/07222147/hydrangea-3487664_1280-11.jpg',
  }),
);

export const AlbumsScreen: FC<StackScreenProps<AlbumsNavigatorParamList, 'Album'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const {
      appLockStore: { inFakeEnvironment },
    } = useStores();
    const bottomTabBarHeight = useBottomTabBarHeight();
    const safeAreaDimensions = useSafeAreaDimensions();
    const { onOpenActionSheet } = useAlbumEditor();
    const { openAlert } = useAlbumCreator();

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={openAlert}
          >
            <SFSymbol size={26} name="plus.circle.fill" />
          </TouchableOpacity>
        ),
      });
    }, []);

    const {
      isLoading,
      isFetching,
      isInitialLoading,
      isRefetching,
      data: albums,
      refetch,
    } = useQuery({
      queryKey: albumKeys.list(`${inFakeEnvironment}`),
      queryFn: async () => {
        await delay(2000);
        return await fetchAlbums({
          is_fake: inFakeEnvironment,
        });
      },
      enabled: true,
    });

    const renderItem = useCallback(({ item }) => {
      return (
        <AlbumItem
          item={item}
          onPress={() => {
            props.navigation.navigate('Photos');
          }}
          onOpenEditor={() => onOpenActionSheet(item)}
        />
      );
    }, []);

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
            data={isFetching ? [] : albums}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={() => {
              refetch();
            }}
          />
        </SafeAreaView>
      </Screen>
    );
  },
);

const $safeAreaView: ViewStyle = {
  flex: 1,
};
