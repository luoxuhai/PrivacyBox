import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { MoreFeatureNavigatorParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme';


export const HideApplicationsScreen: FC<StackScreenProps<MoreFeatureNavigatorParamList, "HideApplications">> = observer(() => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Screen>
      <Text text="hideApplications" />
    </Screen>
  )
})

