import React from 'react';
import { Text, View } from 'react-native';

import { Button, Screen } from '@/components';

function AboutScreen() {
  return (
    <Screen preset="scroll" safeAreaEdges={['bottom', 'left', 'right']}>
      <Text
        style={{
          marginBottom: 1000,
        }}
      >
        AboutScreen
      </Text>
    </Screen>
  );
}

export { AboutScreen };
