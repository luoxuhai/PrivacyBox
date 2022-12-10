import React, { FC } from 'react';
import { Text, ViewStyle, Pressable } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

interface AlbumItemProps {
  item: any;
}
export const AlbumItem = observer<AlbumItemProps>((props) => {
  return (
    <Pressable style={$container}>
      <Text>{props.item.code}</Text>
    </Pressable>
  );
});

const $container: ViewStyle = {};
