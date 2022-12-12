import React from 'react';
import { View, Text } from 'react-native';
import ActionSheet, { SheetProps } from 'react-native-actions-sheet';

export function ExampleSheet(props: SheetProps) {
  return (
    <ActionSheet id={props.sheetId}>
      <View>
        <Text>Hello World</Text>
      </View>
    </ActionSheet>
  );
}
