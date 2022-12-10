import { useMemo } from 'react';
import { ViewStyle } from 'react-native';

export function useChunkArray<T>(array: readonly T[] = [], size: number) {
  return useMemo(() => {
    if (array.length === 0) return [];

    return array.reduce((acc, val) => {
      if (acc.length === 0) acc.push([]);
      const last = acc[acc.length - 1];
      if (last.length < size) {
        last.push(val);
      } else {
        acc.push([val]);
      }
      return acc;
    }, []);
  }, [array, size]);
}

export function useCalculateDimensions({
  itemWidth,
  containerWidth,
  itemWidthFixed,
  spacing,
}: {
  itemWidth: number;
  containerWidth: number;
  itemWidthFixed: boolean;
  spacing: number;
}) {
  return useMemo(() => {
    const availableWidth = containerWidth - spacing;
    const itemTotalWidth = Math.min(itemWidth + spacing, availableWidth);
    const itemsPerRow = Math.floor(availableWidth / itemTotalWidth);
    const availableItemWidth = availableWidth / itemsPerRow;

    let fixedSpacing: number;
    if (itemWidthFixed) {
      fixedSpacing = (containerWidth - itemWidth * itemsPerRow) / (itemsPerRow + 1);
    }

    return {
      itemTotalWidth,
      availableWidth,
      itemsPerRow,
      availableItemWidth,
      fixedSpacing,
    };
  }, [itemWidth, containerWidth, itemWidthFixed, spacing]);
}

export function useStyles({
  itemWidth,
  availableItemWidth,
  spacing,
  itemWidthFixed,
  fixedSpacing,
  horizontalSpacingShown,
}: {
  itemWidth: number;
  availableItemWidth: number;
  spacing: number;
  itemWidthFixed: boolean;
  fixedSpacing: number;
  horizontalSpacingShown: boolean;
}) {
  return useMemo(() => {
    const rowStyle: ViewStyle = {
      flexDirection: 'row',
      paddingLeft: horizontalSpacingShown ? (itemWidthFixed ? fixedSpacing : spacing) : 0,
      paddingBottom: spacing,
    };

    const itemStyle: ViewStyle = {
      flexDirection: 'column',
      justifyContent: 'center',
      width: itemWidthFixed
        ? itemWidth
        : availableItemWidth - (horizontalSpacingShown ? spacing : 0),
      marginRight: itemWidthFixed ? fixedSpacing : spacing,
    };

    return {
      itemStyle,
      rowStyle,
    };
  }, [
    itemWidth,
    availableItemWidth,
    spacing,
    itemWidthFixed,
    fixedSpacing,
    horizontalSpacingShown,
  ]);
}
