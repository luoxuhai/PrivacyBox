import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { ViewStyle, useWindowDimensions } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useQuery } from '@tanstack/react-query';
import { StackActions } from '@react-navigation/native';
import FileViewer from 'react-native-file-viewer';

import { FilesNavigatorParamList } from '@/navigators';
import { Screen, FlatGrid } from '@/components';
import { spacing } from '@/theme';
import { FileItem } from './components/FileItem';
import { ContextMenu } from './components/ContextMenu';
import { ImportButton } from './components/ImportButton';
import { useRefreshOnFocus, useSafeAreaDimensions } from '@/utils';
import { FolderContextProvider } from './context/FolderContext';
import { fileKeys } from './constants';
import { MIN_SCREEN_WIDTH } from '@/constants';
import { useStores } from '@/models';
import { fetchFiles, FetchFilesResult } from '@/services/local/file';
import { translate } from '@/i18n';
import { FileTypes } from '@/database/entities/types';

export interface FilesNavigatorParams {
  parentId: string;
  title?: string;
}

export const FilesScreen: FC<StackScreenProps<FilesNavigatorParamList, 'Files'>> = observer(
  (props) => {
    const {
      appLockStore: { inFakeEnvironment },
    } = useStores();
    const bottomTabBarHeight = useBottomTabBarHeight();
    const safeAreaDimensions = useSafeAreaDimensions();
    const windowDimensions = useWindowDimensions();
    const { title, parentId = null } = props.route.params ?? {};

    useEffect(() => {
      props.navigation.setOptions({
        title: parentId ? title : translate('filesScreen.title'),
        headerLargeTitle: !parentId,
      });
    }, [title, parentId]);

    const {
      data: files,
      isLoading,
      refetch: refetchFiles,
    } = useQuery({
      queryKey: fileKeys.list(`${inFakeEnvironment}:${parentId}`),
      queryFn: async () => {
        return await fetchFiles({
          is_fake: inFakeEnvironment,
          parent_id: parentId,
        });
      },
      enabled: true,
    });

    useRefreshOnFocus(refetchFiles);

    const handlePushFolder = useCallback(
      (item: FetchFilesResult) => {
        const pushAction = StackActions.push('Files', {
          parentId: item.id,
          title: item.name,
        });
        props.navigation.dispatch(pushAction);
      },
      [props.navigation.dispatch],
    );

    const handleOpenFile = useCallback(
      (item: FetchFilesResult) => {
        if (item.type === FileTypes.Folder) {
          handlePushFolder(item);
        } else {
          FileViewer.open(item.uri, {
            displayName: item.name,
            // showAppsSuggestions?: boolean;
            // showOpenWithDialog?: boolean;
            // onDismiss?(): any;
            // onContentUpdate?(): any;
          });
        }
      },
      [props.navigation.dispatch],
    );

    const renderItem = useCallback(
      ({ item }: { item: FetchFilesResult }) => {
        return (
          <ContextMenu item={item}>
            <FileItem item={item} onOpen={() => handleOpenFile(item)} />
          </ContextMenu>
        );
      },
      [handleOpenFile, handlePushFolder],
    );

    const space = useMemo(
      () => (windowDimensions.width <= MIN_SCREEN_WIDTH ? 10 : 20),
      [windowDimensions.width],
    );

    return (
      <FolderContextProvider value={{ folderId: parentId }}>
        <Screen>
          <SafeAreaView style={$safeAreaView} edges={['left', 'right']}>
            <FlatGrid
              contentContainerStyle={{
                paddingBottom: bottomTabBarHeight,
                ...$flatGrid,
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
      </FolderContextProvider>
    );
  },
);

const $safeAreaView: ViewStyle = {
  flex: 1,
};

const $flatGrid: ViewStyle = {
  paddingTop: spacing[4],
};
