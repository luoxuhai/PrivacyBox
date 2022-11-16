import React, { useState } from 'react';
import { Text, Pressable, ScrollView } from 'react-native';
import { AppStackScreenProps } from '@/navigators';

interface WelcomeScreenProps extends AppStackScreenProps<'PasscodeLock'> {}

function PasscodeLockScreen(props: WelcomeScreenProps) {
  const [content, setContent] = useState('episodeStore.episodes?.[0]?.content');
  const { navigation } = props;

  return (
    <ScrollView style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          navigation.navigate('Content', { screen: 'Album' });
          setContent('episodeStore.episodes?.[1]?.content');
        }}
      >
        <Text>{content || 'xxxxxx'}</Text>
      </Pressable>
    </ScrollView>
  );
}

export { PasscodeLockScreen };
