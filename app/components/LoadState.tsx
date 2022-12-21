import React from 'react';
import { ActivityIndicator, Dimensions, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';

interface IDataLoadStatus {
  loading?: boolean;
  text?: string;
  size?: number | 'large' | 'small';
}

export const LoadState = observer<IDataLoadStatus>((props) => {
  return props.loading ? <ActivityIndicator style={$container} size={props.size} /> : null;
});

const $container: ViewStyle = {
  // marginTop: Dimensions.get('window').height / 2 - 120,
};
