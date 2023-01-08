import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';

import { AppStackParamList } from '@/navigators';
import { Screen, VideoPlayer } from '@/components';
import { FetchPhotosResult } from '@/services/local';
import { t } from '@/i18n';

export interface VideoPlayerScreenParams {
  item: FetchPhotosResult;
}

export const VideoPlayerScreen: FC<StackScreenProps<AppStackParamList, 'VideoPlayer'>> = observer(
  (props) => {
    const { item } = props.route.params;

    return (
      <Screen>
        <VideoPlayer
          title={item.name}
          source={{ uri: item.uri }}
          airplayTip={t('videoPlayerScreen.airplayTip')}
          autoPausedTip={t('videoPlayerScreen.autoPausedTip')}
          controlsVisible
          onBack={() => {
            props.navigation.pop(1);
          }}
        />
      </Screen>
    );
  },
);
