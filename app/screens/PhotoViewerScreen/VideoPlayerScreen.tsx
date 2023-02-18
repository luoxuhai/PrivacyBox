import React, { FC, useCallback, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from '@/navigators';
import { Screen, VideoPlayer, VideoPlayerRef } from '@/components';
import { FetchPhotosResult } from '@/services/local';
import { t } from '@/i18n';

export interface VideoPlayerScreenParams {
  item: FetchPhotosResult;
}

export const VideoPlayerScreen: FC<NativeStackScreenProps<AppStackParamList, 'VideoPlayer'>> =
  observer((props) => {
    const { item } = props.route.params;
    const ref = useRef<VideoPlayerRef>();

    props.navigation.addListener('transitionStart', () => {
      ref.current?.pause();
    });

    const handleOrientation = useCallback((portrait: boolean) => {
      props.navigation.setOptions({
        gestureEnabled: portrait,
        autoHideHomeIndicator: !portrait,
      });
    }, []);

    const source = useMemo(
      () => ({
        uri: encodeURI(item.uri),
      }),
      [item.uri],
    );

    return (
      <Screen statusBarStyle="light">
        <VideoPlayer
          ref={ref}
          title={item.name}
          source={source}
          airplayTip={t('videoPlayerScreen.airplayTip')}
          autoPausedTip={t('videoPlayerScreen.autoPausedTip')}
          controlsVisible
          onBack={() => {
            props.navigation.goBack();
          }}
          onOrientation={handleOrientation}
        />
      </Screen>
    );
  });
