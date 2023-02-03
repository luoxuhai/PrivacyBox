import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  PlatformColor,
  View,
} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

import FastImageProgress from '@/components/ImageProgress/FastImageProgress';
import { useUpdateEffect } from '@/utils';
import { useDoubleTapToZoom, useMaxScale } from './hooks';
import {
  Dimensions,
  NativeSyntheticScrollEvent,
  NativeSyntheticTouchEvent,
  ImageSource,
  LoadStatus,
} from './type.d';
import FastImage from 'react-native-fast-image';

export interface ImageViewProps
  extends Pick<ScrollViewProps, 'onScrollEndDrag' | 'onScrollBeginDrag'> {
  source: ImageSource;
  inViewport: boolean;
  renderExtraElements?: (loadStatus: LoadStatus) => JSX.Element | JSX.Element[] | null | undefined;
  delayLongPress?: number;
  delayDoublePress?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  onDoublePress?: () => void;
  onZoomScaleChange?: (scale: number) => void;
  onClose: ({ opacity, moveEnd }: { opacity: number; moveEnd: boolean }) => void;
}

// onPressIn 事件值
let pressInEvent: NativeSyntheticTouchEvent['nativeEvent'];

export const DEFAULT_PROPS = {
  delayDoublePress: 250,
  delayLongPress: 500,
};

function ImageView(props: ImageViewProps): JSX.Element {
  const mergedProps = useMemo(() => ({ ...DEFAULT_PROPS, ...props }), [props]);
  const [imageDimension, setImageDimension] = useState<Dimensions>();
  const [containerDimensions, setContainerDimensions] = useState<Dimensions>();
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(LoadStatus.Loading);
  const loaded = loadStatus === LoadStatus.Succeeded;
  const [scaled, setScaled] = useState<boolean>(false);
  const maxScale = useMaxScale(imageDimension, containerDimensions);
  const scrollViewRef = useRef<ScrollView>(null);
  const handleDoublePress = useDoubleTapToZoom({
    scrollViewRef,
    scaled,
    containerDimensions,
    doublePressDelay: mergedProps.delayDoublePress,
    onDoublePress: props.onDoublePress,
    onPress: props.onPress,
  });

  useEffect(() => {
    scrollViewRef.current?.setNativeProps({
      pinchGestureEnabled: loaded,
      scrollEnabled: loaded,
    });
  }, [loadStatus]);

  // 重制缩放
  useUpdateEffect(() => {
    scrollViewRef.current?.setNativeProps({
      zoomScale: 1,
    });
  }, [props.inViewport]);

  const renderIndicator = useCallback(() => {
    return (
      <FastImage
        style={styles.image}
        source={{
          uri: props.source.thumbnail,
        }}
        resizeMode="contain"
      />
    );
  }, [props.source.thumbnail]);

  const renderError = useCallback(() => {
    return (
      <View style={styles.loadFailed}>
        <Text style={styles.loadFailedText}>加载失败！</Text>
      </View>
    );
  }, []);

  function handleScroll(event: NativeSyntheticScrollEvent) {
    const { zoomScale } = event.nativeEvent;
    setScaled(zoomScale !== 1);
    props.onZoomScaleChange?.(zoomScale);
  }

  const handlePressOut = useCallback(
    (event: NativeSyntheticTouchEvent) => {
      if (
        !loaded ||
        event.nativeEvent.timestamp - pressInEvent.timestamp >= mergedProps.delayLongPress
      )
        return;

      const { locationX: lastX, locationY: lastY } = pressInEvent;
      const { locationX, locationY } = event.nativeEvent;

      if (
        // HACK: 处理滑动页面事件
        !event.nativeEvent.touches?.length &&
        Math.abs(locationX - lastX) < 50 &&
        Math.abs(locationY - lastY) < 50
      ) {
        handleDoublePress(event);
      }
    },
    [handleDoublePress, loaded],
  );

  const gesture = Gesture.Pan()
    .maxPointers(1)
    .runOnJS(true)
    .onChange((e) => {
      console.log(e.translationX, e.translationY);
      // console.prettyLog(e.translationX);
      const o = e.translationY < 0 ? 1 : e.translationY / 800;
      props.onClose({ opacity: o, moveEnd: false });
    })
    .onEnd((e) => {
      const o = e.translationY < 0 ? 1 : e.translationY / 800;
      props.onClose({ opacity: o, moveEnd: true });
    });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainerStyle}
        pinchGestureEnabled
        scrollEnabled
        centerContent
        contentInsetAdjustmentBehavior="never"
        decelerationRate={0.8}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        maximumZoomScale={maxScale}
        scrollEventThrottle={1}
        onScroll={handleScroll}
        onScrollBeginDrag={props.onScrollBeginDrag}
        onScrollEndDrag={props.onScrollEndDrag}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setContainerDimensions({
            width,
            height,
          });
        }}
      >
        <GestureDetector gesture={gesture}>
          <Pressable
            delayLongPress={mergedProps.delayLongPress}
            onPressIn={(event) => {
              pressInEvent = event.nativeEvent;
            }}
            onPressOut={handlePressOut}
            onLongPress={() => loaded && props.onLongPress?.()}
          >
            <FastImageProgress
              style={styles.image}
              source={{
                uri: props.source.poster || props.source.uri,
              }}
              resizeMode="contain"
              threshold={30}
              onLoadStart={() => {
                setLoadStatus(LoadStatus.Loading);
              }}
              onLoad={(e) => {
                setImageDimension(e.nativeEvent);
                setLoadStatus(LoadStatus.Succeeded);
              }}
              onError={() => {
                setLoadStatus(LoadStatus.Failed);
              }}
              renderIndicator={renderIndicator}
              renderError={renderError}
            />
          </Pressable>
        </GestureDetector>
      </ScrollView>
      {props.renderExtraElements?.(loadStatus)}
    </View>
  );
}

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  contentContainerStyle: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  loadFailed: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  loadFailedText: {
    color: PlatformColor('systemRed'),
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
});
