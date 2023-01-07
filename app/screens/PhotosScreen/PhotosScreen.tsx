import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { AppStackParamList } from '@/navigators';
import { FlatGrid, ContentStyle, Screen } from '@/components';
import { useSafeAreaDimensions, useUpdateEffect } from '@/utils';
import { ContextMenu } from './components/ContextMenu';
import { PhotoItem } from './components/PhotoItem';
import { ImportButton } from './components/ImportButton';
import { HeaderAlbumDetail } from './components/HeaderAlbumDetail';
import { BottomToolbar } from './components/BottomToolbar';
import { photoKeys } from './constants';
import { useStores } from '@/models';
import { fetchPhotos, FetchPhotosResult } from '@/services/local';
import { spacing } from '@/theme';
import { MoreButton } from './components/MoreButton';
import { SelectedMask } from './components/SelectedMask';
import { HeaderSelectAll } from './components/HeaderSelectAll';
import { HeaderDoneButton } from './components/HeaderDoneButton';
import {
  PhotoSettingsContextProvider,
  PhotoSettingsContextValue,
  PhotoSettingsInitialValue,
  SelectionContextProvider,
  SelectionContextValue,
  SelectionInitialValue,
} from './context';

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
  const existsSelection = selection.isSelectAll || !!selection.items.length;

  const safeAreaDimensions = useSafeAreaDimensions();
  const { landscape } = useDeviceOrientation();
  const {
    appLockStore: { inFakeEnvironment },
  } = useStores();

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

  const renderHeaderLeft = useCallback(() => {
    return (
      <HeaderSelectAll
        visible={selection.enabled}
        isSelectAll={selection.isSelectAll}
        onPress={() => {
          setSelection((prevValue) => ({
            ...prevValue,
            isSelectAll: !prevValue.isSelectAll,
          }));
        }}
      />
    );
  }, [selection]);

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
  }, [selection.enabled]);

  // 顶部导航栏
  useEffect(() => {
    props.navigation?.setOptions({
      headerTitle: () => <HeaderAlbumDetail name={title} id={albumId} />,
      headerRight: renderHeaderRight,
      // headerLeft: renderHeaderLeft,
    });
  }, [title, albumId, photoSettings, selection, renderHeaderRight]);

  const { data: photos, isLoading } = useQuery({
    queryKey: photoKeys.list(`${inFakeEnvironment}:${albumId}`),
    queryFn: async () => {
      return await fetchPhotos({
        is_fake: inFakeEnvironment,
        parent_id: albumId,
      });
    },
    enabled: true,
  });

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
            items = items.concat(item);
          }

          return {
            ...prevValue,
            items,
          };
        });

        // 打开项目
      } else {
        props.navigation.push('PhotoViewer');
      }
    },
    [selection],
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
        <ImportButton visible={!selection.enabled} albumId={albumId} />
        <BottomToolbar visible={selection.enabled} disabled={!existsSelection} />
      </Screen>
    </SelectionContextProvider>
  );
});

const $safeAreaView: ViewStyle = {
  flex: 1,
};

const $contentContainerStyle: ContentStyle = {
  paddingTop: spacing[4],
};
