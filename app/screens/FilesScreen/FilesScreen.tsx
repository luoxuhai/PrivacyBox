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
import { ImportButton } from './components/ImportButton';
import { useSafeAreaDimensions, delay } from '@/utils';

import { fileKeys } from './constants';
import { MIN_SCREEN_WIDTH } from '@/constants';
import { useStores } from '@/models';
import { fetchFiles, FetchFilesResult } from '@/services/local/file';
import { translate } from '@/i18n';

export interface FilesNavigatorParams {
  parentId: string;
  title?: string;
}

export const FilesScreen: FC<StackScreenProps<FilesNavigatorParamList, 'Files'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const {
      appLockStore: { inFakeEnvironment },
    } = useStores();
    const bottomTabBarHeight = useBottomTabBarHeight();
    const safeAreaDimensions = useSafeAreaDimensions();
    const windowDimensions = useWindowDimensions();
    const { title, parentId } = props.route.params ?? {};

    useEffect(() => {
      props.navigation.setOptions({
        title: parentId ? title : translate('filesScreen.title'),
        headerLargeTitle: !parentId,
      });
    }, [title, parentId]);

    const { data: files, isLoading } = useQuery({
      queryKey: fileKeys.list(`${inFakeEnvironment}:${parentId}`),
      queryFn: async () => {
        await delay(1000);
        return await fetchFiles({
          is_fake: inFakeEnvironment,
          parent_id: parentId,
        });
      },
      enabled: true,
    });

    const renderItem = useCallback(({ item }: { item: FetchFilesResult }) => {
      return (
        <ContextMenu item={item}>
          <FileItem
            item={item}
            onOpen={() => {
              const pushAction = StackActions.push('Files', {
                parentId: item.id,
                title: item.name,
              });
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
            isLoading={isLoading}
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
        <ImportButton parentId={parentId} />
      </Screen>
    );
  },
);

const $safeAreaView: ViewStyle = {
  flex: 1,
};
