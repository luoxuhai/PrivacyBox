import React, { FC, useCallback } from 'react';
import { View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { HoldItem } from 'react-native-hold-menu';

import { AppStackParamList } from '@/navigators';
import { FlatGrid, Screen, Text } from '@/components';
import { radius, useTheme } from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaDimensions } from '@/utils';
import FastImage, { ImageStyle } from 'react-native-fast-image';

const DATA = Array.from(
  {
    length: 50,
  },
  (_, i) => ({
    name: '动物🐒' + i,
    code: '#1abc9c',
    id: i,
    count: i * 10,
    src: 'https://img.ixintu.com/download/jpg/201911/515cc6ef7502d02ecc33e8eb8951c4b7.jpg!con0',
  }),
);

const MenuItems = [
  { text: 'Actions', icon: 'home', isTitle: true, onPress: () => {} },
  { text: 'Action 1', icon: 'edit', onPress: () => {} },
  { text: 'Action 2', icon: 'map-pin', withSeparator: true, onPress: () => {} },
  { text: 'Action 3', icon: 'trash', isDestructive: true, onPress: () => {} },
];

export const PhotosScreen: FC<StackScreenProps<AppStackParamList, 'Photos'>> = observer(() => {
  const { colors } = useTheme();
  const safeAreaDimensions = useSafeAreaDimensions();

  const renderItem = useCallback(({ item }) => {
    return (
      <HoldItem
        containerStyles={{
          flex: 1,
        }}
        items={MenuItems}
      >
        <FastImage
          style={$image}
          source={{
            uri: item.src,
          }}
          resizeMode="cover"
        />
      </HoldItem>
    );
  }, []);

  return (
    <Screen>
      <SafeAreaView style={$safeAreaView} edges={['left', 'right']}>
        <FlatGrid
          contentInsetAdjustmentBehavior="automatic"
          estimatedItemSize={150}
          itemWidth={100}
          autoHeight
          width={safeAreaDimensions.width}
          horizontalSpacingShown={false}
          itemWidthFixed={false}
          spacing={4}
          data={DATA}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </Screen>
  );
});

const $safeAreaView: ViewStyle = {
  flex: 1,
};

const $image: ImageStyle = {
  flex: 1,
  borderRadius: radius[4],
};
