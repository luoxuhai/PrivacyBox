import React, { FC } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { FilesNavigatorParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme';

export const FilesScreen: FC<StackScreenProps<FilesNavigatorParamList, 'Files'>> = observer(() => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Screen>
      <Text text="files" />
    </Screen>
  );
});
