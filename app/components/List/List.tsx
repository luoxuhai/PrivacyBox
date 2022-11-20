import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  SectionListProps,
} from 'react-native';
import { Text } from '../Text';

interface ListProps extends SectionListProps {}

export function List(props: ListProps) {
  return (
    <View
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
    />
  );
}
