/* eslint-disable react/display-name */
import React, { forwardRef, useRef, useImperativeHandle, useMemo, memo } from 'react';
import { SectionListProps, StyleSheet, useWindowDimensions } from 'react-native';

import Section, { SectionGridInstance } from './Section';

const DEFAULT_PROPS = {
  gutter: 10,
  gridEnabled: false,
  horizontal: false,
  fixedItemWidth: false,
};

interface GridSectionListProps {
  sections: SectionListProps<any, any>['sections'];
}

export const SectionGrid = memo(
  forwardRef<SectionGridInstance, GridSectionListProps & SectionListProps<any, any>>(
    (props, ref) => {
      const { itemWidth, gutter, fixedItemWidth, style, ...restProps } = useMemo(
        () => ({ ...DEFAULT_PROPS, ...props }),
        [props],
      );
      const windowDimensions = useWindowDimensions();
      const containerWidth = restProps.containerWidth ?? windowDimensions.width;
      const flatListRef = useRef<SectionGridInstance>(null);

      useImperativeHandle(ref, () => flatListRef.current!);

      return (
        <Section
          style={[styles.container, style]}
          ref={flatListRef}
          windowSize={3}
          {...restProps}
          spacing={gutter}
          itemDimension={itemWidth}
          fixed={fixedItemWidth}
          staticDimension={containerWidth}
          maxDimension={containerWidth}
        />
      );
    },
  ),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
