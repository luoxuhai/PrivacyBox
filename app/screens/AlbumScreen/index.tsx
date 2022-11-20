import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button, Screen } from '@/components';
import { useNavigation } from '@react-navigation/native';

function AlbumScreen() {
  const navigation = useNavigation();
  console.log(navigation.getState().routes);

  return (
    <Screen preset="scroll" safeAreaEdges={['bottom', 'left', 'right']}>
      <Pressable
        onPress={() => {
          navigation.navigate('About');
        }}
      >
        <Text
          style={{
            marginBottom: 1000,
          }}
        >
          AlbumScreen
        </Text>
      </Pressable>
      <Button
        text="xxxxx"
        onPress={() => {
          navigation.navigate('AboutScreen');
        }}
      />
    </Screen>
  );
}

export { AlbumScreen };
