import React, { FC, useEffect } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { AlbumsNavigatorParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { useTheme } from '@/theme';
import { BackButton } from './components/BackButton';
import { HeaderPhotoDetail } from './components/HeaderPhotoDetail';
import { BottomToolbar } from './components/BottomToolbar';

export const PhotoViewerScreen: FC<StackScreenProps<AlbumsNavigatorParamList, 'PhotoViewer'>> =
  observer((props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
      props.navigation.setOptions({
        headerLeft: () => <BackButton onPress={props.navigation.goBack} />,
        headerTitle: () => <HeaderPhotoDetail name="xxx" ctime={243567} />,
      });
    }, []);

    return (
      <Screen>
        <BottomToolbar visible disabled={false} />
      </Screen>
    );
  });
