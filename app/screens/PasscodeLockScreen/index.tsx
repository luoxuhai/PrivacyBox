import React, { useState } from 'react';
import { Text, Pressable, ScrollView } from 'react-native';
import { useStores } from '../../models';
import { AppStackScreenProps } from '../../navigators'; // @demo remove-current-line

interface WelcomeScreenProps extends AppStackScreenProps<'PasscodeLock'> {} // @demo remove-current-line

function PasscodeLockScreen(props: WelcomeScreenProps) {
  const { episodeStore } = useStores();
  const [content, setContent] = useState(episodeStore.episodes?.[0].content);
  const { navigation } = props;

  return (
    <ScrollView style={{ flex: 1 }}>
      <Pressable
        onPress={() => {
          navigation.navigate('Content', { screen: 'Album' });
          setContent(episodeStore.episodes?.[1].content);
        }}
      >
        <Text>{content}</Text>
      </Pressable>
    </ScrollView>
  );
}

export { PasscodeLockScreen };