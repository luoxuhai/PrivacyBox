/* eslint-disable react/display-name */
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { ViewStyle } from 'react-native';
import { LazyPagerView, LazyPagerViewProps } from 'react-native-pager-view';

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
}

export const ImageBrowser = memo(
  forwardRef<ImageBrowserInstance, ImageBrowserProps>(function ImageBrowser(props, ref) {
    const pagerViewRef = useRef<LazyPagerView<ImageSource>>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(props.initialIndex);

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
      [props, currentIndex],
    );

    const keyExtractor = useCallback((item: ImageSource) => item.id, []);

    return (
      <LazyPagerView
        style={[$pageView, props.style]}
        ref={pagerViewRef}
        buffer={4}
        pageMargin={20}
        overdrag
        initialPage={props.initialIndex}
        data={props.images}
        keyExtractor={props.keyExtractor ?? keyExtractor}
        renderItem={renderItem}
        onPageSelected={(e) => {
          const index = e.nativeEvent.position;
          setCurrentIndex(index);
          props.onPageChanged?.(index);
        }}
      />
    );
  }),
);

const $pageView: ViewStyle = {
  flex: 1,
};
