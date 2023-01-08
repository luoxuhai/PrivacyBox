import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Video, { VideoProperties } from 'react-native-video';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAirplayConnectivity } from 'react-airplay';
import { SFSymbol } from 'react-native-sfsymbols';

import Controls from './Controls';
import { Overlay } from '@/utils';

interface VideoPlayerProps {
  title?: string;
  source: VideoProperties['source'];
  /** @default 'ignore' */
  ignoreSilentSwitch?: VideoProperties['ignoreSilentSwitch'];
  airplayTip?: string;
  autoPausedTip?: string;
  controlsVisible?: boolean;
  onBack?: () => void;
}

export function VideoPlayer(props: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [paused, setPaused] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo>();
  const [progress, setProgress] = useState<number>();
  const [rate, setRate] = useState<number>(1);
  const isAirplayConnected = useAirplayConnectivity();
  const [controlsVisible, setControlsVisible] = useState(props.controlsVisible ?? false);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setControlsVisible(true);
      }}
    >
      <SafeAreaProvider>
        <Video
          style={styles.video}
          ref={videoRef}
          ignoreSilentSwitch={props.ignoreSilentSwitch ?? 'ignore'}
          source={props.source}
          controls={false}
          paused={paused}
          rate={rate}
          resizeMode="contain"
          repeat
          playInBackground={false}
          playWhenInactive={false}
          onLoad={(data) => {
            setVideoInfo(data);
          }}
          onProgress={(value) => {
            setProgress(value.currentTime);
          }}
          onEnd={() => {
            if (videoInfo?.duration) {
              setProgress(videoInfo.duration);
            }
          }}
          onAudioBecomingNoisy={() => {
            setPaused(true);
            Overlay.toast({ preset: 'done', title: props.autoPausedTip });
          }}
        />
        <Controls
          visible={controlsVisible}
          title={props.title}
          videoInfo={videoInfo}
          paused={paused}
          progress={progress}
          onBack={() => {
            setPaused(() => {
              setTimeout(() => {
                props.onBack();
              });
              return true;
            });
          }}
          onPlay={() => {
            setPaused(false);
          }}
          onPause={() => {
            setPaused(true);
          }}
          onProgress={(value) => {
            setProgress(value);
            videoRef.current?.seek(value);
          }}
          onVisible={() => {
            setControlsVisible(false);
          }}
          onRate={setRate}
          onBackward={() => {
            videoRef.current.seek(progress - 10);
          }}
          onForward={() => {
            videoRef.current.seek(progress + 10);
          }}
        />
        {isAirplayConnected && <Airplayvideo text={props.airplayTip} />}
      </SafeAreaProvider>
    </Pressable>
  );
}

function Airplayvideo({ text }: { text?: string }) {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SFSymbol
        name="airplayvideo.circle"
        color="#FFF"
        style={{
          width: 90,
          height: 90,
        }}
      />
      <Text
        style={{
          color: '#FFF',
          marginTop: 6,
        }}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  video: {
    flex: 1,
  },
});
