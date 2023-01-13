import React, { FC, useCallback, useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import FileViewer from 'react-native-file-viewer';

import { MoreFeatureNavigatorParamList } from '@/navigators';
import { FlatGrid, ContentStyle, Screen } from '@/components';
import { useSafeAreaDimensions, useUpdateEffect } from '@/utils';
import { recycleBinKeys } from './constants';
import { fetchDeletedPhotos, FetchPhotosResult } from '@/services/local';
import { spacing } from '@/theme';
import { SelectionContextProvider, SelectionContextValue, SelectionInitialValue } from './context';
import { BottomToolbar } from './components/BottomToolbar';
import { ListHeader } from './components/ListHeader';
import { SelectedMask } from '@/screens/PhotosScreen/components/SelectedMask';
import { PhotoItem } from '@/screens/PhotosScreen/components/PhotoItem';
import { useStores } from '@/models';
import { HeaderDoneButton } from './components/HeaderDoneButton';
import { MoreButton } from './components/MoreButton';

interface ListExtraData {
  selection: SelectionContextValue;
}

export const RecycleBinScreen: FC<StackScreenProps<MoreFeatureNavigatorParamList, 'RecycleBin'>> =
  observer((props) => {
    const [selection, setSelection] = useState<SelectionContextValue>(SelectionInitialValue);
    const safeAreaDimensions = useSafeAreaDimensions();
    const { landscape } = useDeviceOrientation();
    const {
      appLockStore: { inFakeEnvironment },
      globalStore,
    } = useStores();

    props.navigation.addListener('transitionStart', () => {
      selection.enabled = false;
      globalStore.setBottomTabVisible(true);
    });

    // 重置 selection
    useUpdateEffect(() => {
      if (!selection.enabled) {
        setSelection(SelectionInitialValue);
      }
    }, [selection.enabled]);

    useUpdateEffect(() => {
      globalStore.setBottomTabVisible(!selection.enabled);
    }, [selection.enabled]);

    /** 取消选择模式 */
    const handleCancelSelect = useCallback(() => {
      setSelection((prevValue) => ({
        ...prevValue,
        enabled: false,
      }));
    }, [selection]);

    const { data: photos } = useQuery({
      queryKey: recycleBinKeys.list({ inFakeEnvironment }),
      queryFn: async ({ queryKey }) => {
        const [_k1, _k2, { filter }] = queryKey;
        return await fetchDeletedPhotos({
          is_fake: filter.inFakeEnvironment,
        });
      },
      placeholderData: [],
      enabled: true,
    });

    const renderHeaderRight = useCallback(() => {
      return (
        <>
          <HeaderDoneButton visible={selection.enabled} onPress={handleCancelSelect} />
          <MoreButton
            visible={!selection.enabled}
            selectVisible={!!photos.length}
            onSelect={() => {
              setSelection((prevValue) => ({
                ...prevValue,
                enabled: true,
              }));
            }}
          />
        </>
      );
    }, [selection.enabled, photos.length]);

    // 顶部导航栏
    useEffect(() => {
      props.navigation?.setOptions({
        headerRight: renderHeaderRight,
      });
    }, [renderHeaderRight]);

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
          FileViewer.open(item.uri, {
            displayName: item.name,
          });
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
            <PhotoItem item={item} onPress={handlePressItem} />
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
              ListHeaderComponent={ListHeader}
              renderItem={renderItem}
            />
          </SafeAreaView>
          <BottomToolbar
            onDone={() => {
              setSelection((prev) => ({
                ...prev,
                enabled: false,
              }));
            }}
          />
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
