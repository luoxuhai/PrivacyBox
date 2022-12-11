import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { ContentTabParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme';

export const PhotosScreen: FC<StackScreenProps<ContentTabParamList, 'Photos'>> = observer(() => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Screen>
      <Text text="photos" />
    </Screen>
  );
});
