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

const DATA = [{ name: 'TURQUOISE', code: '#1abc9c', id: 11 }];

export const AlbumsScreen: FC<StackScreenProps<AlbumsNavigatorParamList, 'Album'>> = observer(
  () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const bottomTabBarHeight = useBottomTabBarHeight();

    const renderItem = useCallback(({ item }) => {
      return <AlbumItem item={item} />;
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

const $itemContainer: ViewStyle = {
  justifyContent: 'flex-end',
  borderRadius: 5,
  padding: 10,
  height: 200,
};

const $itemName = {
  fontSize: 16,
  color: '#fff',
  fontWeight: '600',
};

const $itemCode = {
  fontWeight: '600',
  fontSize: 12,
  color: '#fff',
};
