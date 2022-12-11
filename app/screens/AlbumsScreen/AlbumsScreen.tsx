import React, { FC, useCallback } from 'react';
import { View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { AlbumsNavigatorParamList } from '@/navigators';
import { SafeAreaScrollView, Screen, Text, FlatGrid } from '@/components';
import { useTheme } from '@/theme';
import { AlbumItem } from './AlbumItem';
import { useAlbumEditor } from './useAlbumEditor';

const DATA = Array.from(
  {
    length: 5,
  },
  (_, i) => ({
    name: '动物🐒' + i,
    code: '#1abc9c',
    id: i,
    count: i * 10,
    src: 'https://img.ixintu.com/download/jpg/201911/515cc6ef7502d02ecc33e8eb8951c4b7.jpg!con0',
  }),
);

export const AlbumsScreen: FC<StackScreenProps<AlbumsNavigatorParamList, 'Album'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const bottomTabBarHeight = useBottomTabBarHeight();

    const { onOpenActionSheet } = useAlbumEditor();

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
            spacing={20}
            data={DATA}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </Screen>
    );
  },
);

const $safeAreaView = {
  flex: 1,
};
