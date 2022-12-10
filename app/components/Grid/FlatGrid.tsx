import React, { forwardRef, useState, useCallback, useImperativeHandle, useRef } from 'react';
import { View, Dimensions, ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { FlashList, FlashListProps, RenderTarget } from '@shopify/flash-list';
import { useCalculateDimensions, useChunkArray, useStyles } from './hooks';

type FlashListRef = typeof FlashList;

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

interface FlatGridProps<T> extends Omit<FlashListProps<T>, 'numColumns'> {
  /**
   * 固定宽度
   * @default false
   */
  itemWidthFixed?: boolean;
  /** 项目最小宽度, itemFixed 为 true 时为最小宽度 */
  itemWidth: number;
  autoHeight?: boolean;
  width?: number;
  /** 间距
   * @default 10
   */
  spacing?: number;
  /** 显示水平间距
   * @default true
   */
  horizontalSpacingShown?: boolean;
  /** 启动 Grid 布局
   * @default true
   */
  gridEnabled?: boolean;
}

export const FlatGrid = forwardRef(function FlatGrid<T>(
  props: FlatGridProps<T>,
  ref: FlashList<T>,
) {
  const {
    itemWidthFixed = false,
    spacing = 10,
    horizontalSpacingShown = true,
    gridEnabled = true,
    autoHeight = false,
    itemWidth,
    width,
    data,
    renderItem,
    keyExtractor,
    onLayout,
    ...flashListProps
  } = props;

  const [containerWidth, setContainerWidth] = useState<number>(
    width || Dimensions.get('window').width,
  );
  const listRef = useRef<FlashList<T>>(null);

  useImperativeHandle(ref, () => listRef.current);

  const onLayoutLocal = useCallback(
    (event) => {
      if (!width) {
        setContainerWidth(event.nativeEvent.layout.width);
      }
      onLayout?.(event);
    },
    [width, onLayout],
  );

  const localKeyExtractor = useCallback(
    (rowItems, index) => {
      if (keyExtractor) {
        return rowItems
          .map((rowItem: any, rowItemIndex: number) => keyExtractor(rowItem, rowItemIndex))
          .join('_');
      }
      return `row_${index}`;
    },
    [keyExtractor],
  );

  const { availableItemWidth, itemsPerRow, fixedSpacing } = useCalculateDimensions({
    itemWidth,
    containerWidth,
    spacing,
    itemWidthFixed,
  });

  const { itemStyle, rowStyle } = useStyles({
    itemWidth,
    availableItemWidth,
    spacing,
    fixedSpacing,
    itemWidthFixed,
    horizontalSpacingShown,
  });

  const renderRow = useCallback(
    (props: RenderItemParams<T>) => {
      const { index: rowIndex, item: rowItems } = props;

      const isFirstRow = rowIndex === 0;
      const rowStyles: ViewStyle[] = [
        rowStyle,
        isFirstRow && {
          marginTop: spacing,
        },
      ];

      return (
        <View style={rowStyles}>
          {rowItems?.map((item, index) => (
            <View
              key={
                keyExtractor
                  ? `${keyExtractor(item, index)}_${index}`
                  : `item_${rowIndex * itemsPerRow + index}`
              }
              style={[
                itemStyle,
                autoHeight && {
                  height: itemStyle.width,
                  overflow: 'hidden',
                },
              ]}
            >
              {renderItem({
                ...props,
                item,
                index: rowIndex * itemsPerRow + index,
              })}
            </View>
          ))}
        </View>
      );
    },
    [renderItem, keyExtractor, spacing],
  );

  const rows = useChunkArray<T>(data, itemsPerRow);

  return (
    <AnimatedFlashList
      ref={listRef}
      data={gridEnabled ? rows : data}
      entering={FadeIn.duration(500)}
      renderItem={renderRow}
      {...flashListProps}
      onLayout={onLayoutLocal}
      keyExtractor={localKeyExtractor}
    />
  );
});

interface RenderItemParams<T> {
  item: T;
  index: number;
  target: RenderTarget;
  extraData: any;
}
