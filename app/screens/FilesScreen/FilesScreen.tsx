import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { TouchableOpacity, ViewStyle, View, useWindowDimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SFSymbol } from 'react-native-sfsymbols';
import { useQuery } from '@tanstack/react-query';
import { StackActions } from '@react-navigation/native';

import { FilesNavigatorParamList } from '@/navigators';
import { Screen, FlatGrid, LoadState, EmptyState } from '@/components';
import { spacing, useTheme } from '@/theme';
import { FileItem } from './components/FileItem';
import { ContextMenu } from './components/ContextMenu';
import { useSafeAreaDimensions, delay } from '@/utils';

import { fetchAlbums } from '@/services/local';
import { fileKeys } from './constants';
import { MIN_SCREEN_WIDTH } from '@/constants';
import { useStores } from '@/models';

export const FilesScreen: FC<StackScreenProps<FilesNavigatorParamList, 'Files'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const {
      appLockStore: { inFakeEnvironment },
    } = useStores();
    const bottomTabBarHeight = useBottomTabBarHeight();
    const safeAreaDimensions = useSafeAreaDimensions();
    const windowDimensions = useWindowDimensions();

    const { data: files } = useQuery({
      queryKey: fileKeys.list(`${inFakeEnvironment}`),
      queryFn: async () => {
        await delay(2000);
        return await fetchAlbums({
          is_fake: inFakeEnvironment,
        });
      },
      enabled: true,
    });

    useEffect(() => {
      if (props.route.params?.title) {
        props.navigation.setOptions({
          title: props.route.params?.title,
        });
      }
    }, [props.route.params?.title]);

    const renderItem = useCallback(({ item }) => {
      return (
        <ContextMenu>
          <FileItem
            item={item}
            onPress={() => {
              const pushAction = StackActions.push('Files', { parent_id: 'xxx', title: 'xxx' });
              props.navigation.dispatch(pushAction);
            }}
          />
        </ContextMenu>
      );
    }, []);

    const space = useMemo(
      () => (windowDimensions.width <= MIN_SCREEN_WIDTH ? 10 : 20),
      [windowDimensions.width],
    );

    return (
      <Screen>
        <SafeAreaView style={$safeAreaView} edges={['left', 'right']}>
          <FlatGrid
            contentContainerStyle={{
              paddingBottom: bottomTabBarHeight,
              paddingTop: spacing[6],
            }}
            contentInsetAdjustmentBehavior="automatic"
            estimatedItemSize={150}
            itemWidth={100}
            width={safeAreaDimensions.width}
            itemWidthFixed={false}
            spacing={space}
            data={files}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </Screen>
    );
  },
);

const $safeAreaView: ViewStyle = {
  flex: 1,
};
