import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Text,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import Animated, { FadeIn, useSharedValue } from 'react-native-reanimated';
import { isUndefined } from 'lodash';
import { useAppState } from '@react-native-community/hooks';
import { Slider } from 'react-native-awesome-slider';
import { SFSymbol } from 'react-native-sfsymbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OrientationLocker, { OrientationType } from 'react-native-orientation-locker';
import { showRoutePicker, useExternalPlaybackAvailability } from 'react-airplay';

import { formatDuration, useUpdateEffect } from '@/utils';
import { BOTTOM_TABS_HEIGHT } from '@/constants';
import { radius, spacing, typography, useTheme } from '@/theme';
import { iconProps, IconButton } from './IconButton';
import { BlurView } from '../BlurView';

type Orientation = 'portrait' | 'landscape-left' | 'landscape-right';

// interface VideoPlayerInstance {
//   getCurrentTime: () => void;
//   seek: (seconds: number) => void;
// }

interface ControlsProps {
  orientation: Orientation;
  videoInfo?: VideoInfo;
  paused?: boolean;
  progress?: number;
  visible: boolean;
  title?: string;
  onBack?: () => void;
  onPlay: () => void;
  onPause: () => void;
  onProgress: (progress: number) => void;
  onVisible: () => void;
  onRate: (rate: number) => void;
  onForward: () => void;
  onBackward: () => void;
  onShare: () => void;
  onOrientation?: (portrait: boolean) => void;
}

export default function Controls(props: ControlsProps) {
  const { colors } = useTheme();
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const insets = useSafeAreaInsets();
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const appState = useAppState();
  const isExternalPlaybackAvailable = useExternalPlaybackAvailability();
  const lastPressTime = useRef<number>();
  const pressTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    OrientationLocker.getOrientation((value) => {
      switch (value) {
        case OrientationType['LANDSCAPE-LEFT']:
          setOrientation('landscape-left');
          break;
        case OrientationType['LANDSCAPE-RIGHT']:
          setOrientation('landscape-right');
          break;
        default:
          setOrientation('portrait');
      }
    });

    return () => {
      StatusBar.setHidden(false);
      OrientationLocker.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {
    if (!isUndefined(props.progress) && props.videoInfo?.duration) {
      const _progress = (props.progress / props.videoInfo.duration) * 100;
      progress.value = _progress;
      if (_progress === 100) {
        props.onProgress(0);
      }
    }
  }, [props.progress]);

  useUpdateEffect(() => {
    if (orientation === 'portrait') {
      OrientationLocker.lockToPortrait();
    } else {
      OrientationLocker.lockToLandscape();
    }

    props.onOrientation(orientation === 'portrait');
    props.onVisible();
  }, [orientation]);

  useEffect(() => {
    if (appState === 'background' || appState === 'inactive') {
      props.onPause();
    }
  }, [appState]);

  useEffect(() => {
    StatusBar.setHidden(!props.visible, 'fade');
  }, [props.visible]);

  const containerStyle: ViewStyle = useMemo(() => {
    const spacing = 16;
    const { left, right, top, bottom } = insets;
    return {
      paddingLeft: left === 0 ? left + spacing : left,
      paddingRight: right === 0 ? right + spacing : right,
      paddingBottom: bottom === 0 ? bottom + spacing : bottom,
      paddingTop: top === 0 ? top + spacing : top,
    };
  }, [insets]);

  function handleOrientation() {
    setOrientation((old) => {
      return old === 'portrait' ? 'landscape-left' : 'portrait';
    });
  }

  function handlePlayState() {
    if (props.paused) {
      props.onPlay();
    } else {
      props.onPause();
    }
  }

  function onSlidingComplete() {
    props.onPlay();
  }

  function onValueChange(value: number) {
    if (!props.videoInfo?.duration) {
      return;
    }
    props.onProgress((value / 100) * props.videoInfo.duration);
  }

  function handlePressBackground(event: GestureResponderEvent) {
    clearTimeout(pressTimer.current);
    const nowTime = event.nativeEvent.timestamp;

    if (lastPressTime.current && nowTime - lastPressTime.current < 250) {
      lastPressTime.current = null;
      clearTimeout(pressTimer.current);
      handlePlayState();
      return;
    }

    if (!lastPressTime.current) {
      lastPressTime.current = nowTime;
      // 双击
    }

    pressTimer.current = setTimeout(() => {
      lastPressTime.current = null;
      props.onVisible();
    }, 250);
  }

  return (
    <View
      style={[
        styles.container,
        {
          display: props.visible ? 'flex' : 'none',
        },
      ]}
    >
      <View
        style={[
          styles.topToolbar,
          {
            paddingLeft: containerStyle.paddingLeft,
            paddingRight: containerStyle.paddingRight,
            paddingTop: containerStyle.paddingTop,
            height: (orientation === 'portrait' ? BOTTOM_TABS_HEIGHT : BOTTOM_TABS_HEIGHT / 2) + 20,
          },
        ]}
      >
        <BlurView style={StyleSheet.absoluteFill} blurType="thinMaterialDark" />
        <TouchableOpacity
          style={{
            width: 33,
            height: 44,
            justifyContent: 'center',
          }}
          onPress={() => {
            if (orientation === 'portrait') {
              props.onBack();
            } else {
              setOrientation('portrait');
              setTimeout(props.onBack, 500);
            }
          }}
        >
          <SFSymbol
            name="chevron.backward"
            color={iconProps.color}
            style={{
              width: 22,
              height: 22,
            }}
          />
        </TouchableOpacity>
        {props.title ? (
          <Text style={$title} numberOfLines={1} ellipsizeMode="middle">
            {props.title}
          </Text>
        ) : null}
        <ViewGroup>
          <IconButton
            style={{
              marginRight: 20,
            }}
            disabled={!isExternalPlaybackAvailable}
            name="airplayvideo"
            onPress={() => showRoutePicker({ prioritizesVideoDevices: true })}
          />
          <IconButton name="square.and.arrow.up" onPress={props.onShare} />
        </ViewGroup>
      </View>
      <Pressable style={styles.background} onPress={handlePressBackground} />
      <View
        style={[
          styles.bottomToolbar,
          {
            paddingLeft: containerStyle.paddingLeft,
            paddingRight: containerStyle.paddingRight,
            paddingBottom: containerStyle.paddingBottom as number,
          },
        ]}
      >
        <BlurView style={StyleSheet.absoluteFill} blurType="thinMaterialDark" />
        <Slider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          onSlidingStart={props.onPause}
          onSlidingComplete={onSlidingComplete}
          onValueChange={onValueChange}
          renderBubble={() => null}
          containerStyle={styles.slider}
          theme={{
            minimumTrackTintColor: colors.palette.primary6,
            maximumTrackTintColor: colors.palette.primary1,
          }}
          disable={!props.videoInfo}
        />
        <View style={styles.bottomControls}>
          <ViewGroup>
            <IconButton
              style={{
                marginRight: 20,
              }}
              name={props.paused ? 'play.fill' : 'pause.fill'}
              onPress={handlePlayState}
            />
            <IconButton
              style={{
                marginRight: 16,
              }}
              name="gobackward.10"
              onPress={props.onBackward}
            />
            <IconButton
              style={{
                marginRight: 26,
              }}
              name="goforward.10"
              onPress={props.onForward}
            />

            <Progress currentTime={props.progress} duration={props.videoInfo?.duration} />
          </ViewGroup>

          <IconButton
            name={
              orientation === 'portrait'
                ? 'arrow.up.backward.and.arrow.down.forward'
                : 'arrow.down.forward.and.arrow.up.backward'
            }
            onPress={handleOrientation}
          />
        </View>
      </View>
    </View>
  );
}

function Progress(props: { currentTime?: number; duration?: number }) {
  return !isUndefined(props?.currentTime) ? (
    <Animated.Text style={styles.time} entering={FadeIn}>
      {props?.currentTime ? formatDuration(props?.currentTime * 1000) : 0}
      {' / '}
      {props?.duration ? formatDuration(props?.duration * 1000) : '-'}
    </Animated.Text>
  ) : null;
}

function ViewGroup(props) {
  return <View style={styles.group}>{props.children}</View>;
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  bottomControls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  bottomToolbar: {
    borderTopLeftRadius: radius[10],
    borderTopRightRadius: radius[10],
    overflow: 'hidden',
    paddingTop: spacing[8],
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  slider: {
    borderRadius: 4,
  },
  time: {
    color: '#FFF',
  },
  topToolbar: {
    alignItems: 'center',
    borderBottomLeftRadius: radius[10],
    borderBottomRightRadius: radius[10],
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingBottom: 20,
  },
});

const $title: TextStyle = {
  flex: 1,
  paddingRight: spacing[4],
  ...typography.headline,
  color: '#FFF',
};
