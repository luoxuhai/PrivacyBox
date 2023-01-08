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
          source={{ uri: encodeURI('file://' + item.uri) }}
          airplayTip={t('videoPlayerScreen.airplayTip')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
      </Screen>
    );
  },
);
