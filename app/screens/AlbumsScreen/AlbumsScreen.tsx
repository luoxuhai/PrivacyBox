import React, { FC, useCallback, useEffect } from 'react';
import { Dimensions, TouchableOpacity, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SheetManager } from 'react-native-actions-sheet';

import { AlbumsNavigatorParamList } from '@/navigators';
import { SafeAreaScrollView, Screen, Text, FlatGrid } from '@/components';
import { spacing, useTheme } from '@/theme';
import { AlbumItem } from './AlbumItem';
import { useAlbumEditor } from './useAlbumEditor';
import { useAlbumCreator } from './useAlbumCreator';
import { useSafeAreaDimensions } from '@/utils';
import { SFSymbol } from 'react-native-sfsymbols';

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

    const renderItem = useCallback(({ item }) => {
      return (
        <AlbumItem
          item={item}
          onPress={() => {
            props.navigation.navigate('Photos');
          }}
          onOpenEditor={onOpenActionSheet}
        />
      );
    }, []);

    console.log(safeAreaDimensions.width);

    return (
      <Screen>
        <SafeAreaView style={$safeAreaView} edges={['left', 'right']}>
          <FlatGrid
            contentContainerStyle={{
              paddingBottom: bottomTabBarHeight,
            }}
            contentInsetAdjustmentBehavior="automatic"
            estimatedItemSize={150}
            itemWidth={150}
            width={safeAreaDimensions.width}
            itemWidthFixed={false}
            spacing={26}
            data={DATA}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={() => {}}
          />
        </SafeAreaView>
      </Screen>
    );
  },
);

const $safeAreaView: ViewStyle = {
  flex: 1,
};
