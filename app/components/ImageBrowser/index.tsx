/* eslint-disable react/display-name */
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import { LazyPagerView, LazyPagerViewProps } from 'react-native-pager-view';
import isEqual from 'react-fast-compare';

import ImageView, { ImageViewProps } from './ImageView';
import { ImageSource, LoadStatus } from './type.d';

export * from './type.d';

export type ImageBrowserProps = {
  initialIndex: number;
  images: ImageSource[];
  renderExtraElements?: (params: {
    index: number;
    loadStatus: LoadStatus;
  }) => JSX.Element | JSX.Element[] | null;
  onPageChanged?: (index: number) => void;
} & Pick<LazyPagerViewProps<ImageSource>, 'buffer' | 'keyExtractor' | 'maxRenderWindow' | 'style'> &
  Pick<
    ImageViewProps,
    | 'onScrollBeginDrag'
    | 'onScrollEndDrag'
    | 'onPress'
    | 'onDoublePress'
    | 'onLongPress'
    | 'onZoomScaleChange'
  >;

export interface ImageBrowserInstance {
  setPage: (index: number, animation?: boolean) => void;
  setScrollEnabled: (scrollEnabled: boolean) => void;
  onBack: (value: boolean) => void;
}

export const ImageBrowser = memo(
  forwardRef<ImageBrowserInstance, ImageBrowserProps>(function ImageBrowser(props, ref) {
    const pagerViewRef = useRef<LazyPagerView<ImageSource>>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(props.initialIndex);
    const [back, setBack] = useState(false);

    useImperativeHandle(ref, () => ({
      setPage(index: number, animation = true) {
        if (animation) {
          pagerViewRef.current?.setPage(index);
        } else {
          pagerViewRef.current?.setPageWithoutAnimation(index);
        }
      },
      setScrollEnabled(scrollEnabled: boolean) {
        pagerViewRef.current?.setScrollEnabled(scrollEnabled);
      },
      onBack(value: boolean) {
        setBack(value);
      },
    }));

    const renderItem = useCallback(
      ({ item, index }) => {
        return (
          <ImageView
            source={item}
            inViewport={index === currentIndex}
            renderExtraElements={(loadStatus) => props.renderExtraElements?.({ index, loadStatus })}
            onPress={props.onPress}
            onDoublePress={props.onDoublePress}
            onLongPress={props.onLongPress}
            onZoomScaleChange={props.onZoomScaleChange}
            onScrollEndDrag={props.onScrollEndDrag}
            onScrollBeginDrag={props.onScrollBeginDrag}
          />
        );
      },
      [
        props.renderExtraElements,
        props.onPress,
        props.onDoublePress,
        props.onLongPress,
        props.onZoomScaleChange,
        props.onScrollEndDrag,
        props.onScrollBeginDrag,
        currentIndex,
      ],
    );

    const onPageSelected = useCallback(
      (e: any) => {
        const index = e.nativeEvent.position;
        setCurrentIndex(index);
        props.onPageChanged?.(index);
      },
      [props.onPageChanged],
    );

    if (back) {
      return null;
    }

    return (
      <LazyPagerView
        style={[$pageView, props.style]}
        ref={pagerViewRef}
        buffer={4}
        pageMargin={20}
        overdrag
        initialPage={props.initialIndex}
        data={props.images}
        keyExtractor={props.keyExtractor}
        renderItem={renderItem}
        onPageSelected={onPageSelected}
      />
    );
  }),
  isEqual,
);

const $pageView: ViewStyle = {
  flex: 1,
};
