import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { AppStackParamList } from '@/navigators';
import { FlatGrid, ContentStyle, Screen } from '@/components';
import { useSafeAreaDimensions, useUpdateEffect } from '@/utils';
import { ContextMenu } from './components/ContextMenu';
import { PhotoItem } from './components/PhotoItem';
import { ImportButton } from './components/ImportButton';
import { HeaderAlbumDetail } from './components/HeaderAlbumDetail';
import { BottomToolbar } from './components/BottomToolbar';
import { photoKeys } from './constants';
import { fetchPhotos, FetchPhotosResult } from '@/services/local';
import { spacing } from '@/theme';
import { MoreButton } from './components/MoreButton';
import { SelectedMask } from './components/SelectedMask';
import { HeaderDoneButton } from './components/HeaderDoneButton';
import {
  PhotoSettingsContextProvider,
  PhotoSettingsContextValue,
  PhotoSettingsInitialValue,
  SelectionContextProvider,
  SelectionContextValue,
  SelectionInitialValue,
  QueryKeyContextProvider,
} from './context';
import { albumKeys } from '../AlbumsScreen/constants';

export interface PhotosNavigatorParams {
  albumId: string;
  title?: string;
}

interface ListExtraData {
  selection: SelectionContextValue;
}

export const PhotosScreen: FC<StackScreenProps<AppStackParamList, 'Photos'>> = observer((props) => {
  const { albumId, title } = props.route.params;
  const [photoSettings, setPhotoSettings] =
    useState<PhotoSettingsContextValue>(PhotoSettingsInitialValue);
  const [selection, setSelection] = useState<SelectionContextValue>(SelectionInitialValue);
  const queryClient = useQueryClient();
  const safeAreaDimensions = useSafeAreaDimensions();
  const { landscape } = useDeviceOrientation();
  const queryKey = useMemo(
    () => photoKeys.list(albumId, photoSettings.orderBy),
    [albumId, photoSettings.orderBy],
  );
  // 重置 selection
  useUpdateEffect(() => {
    if (!selection.enabled) {
      setSelection(SelectionInitialValue);
    }
  }, [selection.enabled]);

  /** 取消选择模式 */
  const handleCancelSelect = useCallback(() => {
    setSelection((prevValue) => ({
      ...prevValue,
      enabled: false,
    }));
  }, [selection]);

  // const renderHeaderLeft = useCallback(() => {
  //   return (
  //     <HeaderSelectAll
  //       visible={selection.enabled}
  //       isSelectAll={selection.isSelectAll}
  //       onPress={() => {
  //         setSelection((prevValue) => ({
  //           ...prevValue,
  //           isSelectAll: !prevValue.isSelectAll,
  //         }));
  //       }}
  //     />
  //   );
  // }, [selection]);

  const renderHeaderRight = useCallback(() => {
    return (
      <PhotoSettingsContextProvider value={photoSettings}>
        <HeaderDoneButton visible={selection.enabled} onPress={handleCancelSelect} />
        <MoreButton
          visible={!selection.enabled}
          onSort={setPhotoSettings}
          onSelect={() => {
            setSelection((prevValue) => ({
              ...prevValue,
              enabled: true,
            }));
          }}
        />
      </PhotoSettingsContextProvider>
    );
  }, [selection.enabled, photoSettings]);

  // 顶部导航栏
  useEffect(() => {
    props.navigation?.setOptions({
      headerTitle: () => <HeaderAlbumDetail name={title} id={albumId} />,
      headerRight: renderHeaderRight,
      // headerLeft: renderHeaderLeft,
    });
  }, [title, albumId, renderHeaderRight]);

  const { data: photos } = useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const [_key1, _key2, { order }] = queryKey;
      return await fetchPhotos({
        parent_id: albumId,
        order_by: order,
      });
    },
    placeholderData: [],
    enabled: true,
  });

  useUpdateEffect(() => {
    queryClient.fetchQuery(albumKeys.detail(albumId));
  }, [photos.length]);

  const handlePressItem = useCallback(
    (item: FetchPhotosResult) => {
      // 选择项目
      if (selection.enabled) {
        setSelection((prevValue) => {
          let items = prevValue.items;
          const exists = prevValue.items.includes(item);
          if (exists) {
            items = items.filter((_item) => _item !== item);
          } else {
            items = [...items, item];
          }

          return {
            ...prevValue,
            items,
          };
        });

        // 打开项目
      } else {
        props.navigation.navigate('PhotoViewer', {
          queryKey,
          item,
        });
      }
    },
    [selection, queryKey],
  );

  const renderItem = useCallback(
    ({ item, extraData }: { item: FetchPhotosResult; extraData: ListExtraData }) => {
      const { selection } = extraData;
      const isSelected =
        selection.isSelectAll || !!selection.items.find((val) => val.id === item.id);

      return (
        <>
          <ContextMenu item={item} disabled={selection.enabled}>
            <PhotoItem item={item} onPress={handlePressItem} />
          </ContextMenu>
          <SelectedMask visible={isSelected} />
        </>
      );
    },
    [handlePressItem],
  );

  return (
    <QueryKeyContextProvider value={queryKey}>
      <SelectionContextProvider value={selection}>
        <Screen>
          <SafeAreaView style={$safeAreaView} edges={['left', 'right', 'bottom']}>
            <FlatGrid
              contentContainerStyle={$contentContainerStyle}
              contentInsetAdjustmentBehavior="automatic"
              estimatedItemSize={150}
              itemWidth={landscape ? 120 : 110}
              autoHeight
              width={safeAreaDimensions.width}
              itemWidthFixed={false}
              spacing={2}
              data={photos}
              extraData={{
                selection,
              }}
              renderItem={renderItem}
            />
          </SafeAreaView>
          <ImportButton queryKey={queryKey} />
          <BottomToolbar />
        </Screen>
      </SelectionContextProvider>
    </QueryKeyContextProvider>
  );
});

const $safeAreaView: ViewStyle = {
  flex: 1,
};

const $contentContainerStyle: ContentStyle = {
  paddingTop: spacing[4],
};
