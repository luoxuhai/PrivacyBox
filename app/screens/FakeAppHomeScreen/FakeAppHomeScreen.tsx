import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, TouchableOpacity, View, TextStyle, EmitterSubscription } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  PeopleRounded,
  InfoEmpty,
  MediaImageList,
  ScanQrCode,
  TextAlt,
} from 'iconoir-react-native';
import { FlashList, ContentStyle } from '@shopify/flash-list';
import { colord } from 'colord';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Shake from 'react-native-shake';

import { AppStackParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { radius, spacing, useTheme } from '@/theme';
import { translate } from '@/i18n';
import { useStores } from '@/models';
import { HapticFeedback } from '@/utils';
import { FakeHomeUnlockActions } from '@/models/SettingsStore';
import { FakePageKeys } from './constants';

function luminance(color: string, l = 0.1) {
  return colord(color).lighten(l).toRgbString();
}

const iconProps = {
  color: '#FFF',
  width: 28,
  height: 28,
};

export const FakeAppHomeScreen: FC<StackScreenProps<AppStackParamList, 'FakeAppHome'>> = observer(
  function FakeAppHomeScreen(props) {
    const { colors } = useTheme();
    const { settingsStore } = useStores();

    useEffect(() => {
      let subscription: EmitterSubscription;
      if (settingsStore.fakeHomeUnlockActions.includes(FakeHomeUnlockActions.Shake)) {
        subscription = Shake.addListener(() => {
          openAppLock();
          HapticFeedback.impact.heavy();
        });
      }
      return () => {
        subscription?.remove();
      };
    }, [settingsStore.fakeHomeUnlockActions]);

    const list = useMemo(
      () => [
        {
          key: FakePageKeys.ExifViewer,
          title: translate('fakeAppHomeScreen.exif'),
          icon: <InfoEmpty {...iconProps} />,
          color: luminance(colors.palette.pink),
        },
        {
          key: FakePageKeys.ExifEditor,
          title: translate('fakeAppHomeScreen.removeInfo'),
          icon: <MediaImageList {...iconProps} />,
          color: luminance(colors.palette.orange),
        },
        {
          key: FakePageKeys.Face,
          title: translate('fakeAppHomeScreen.faceMosaic'),
          icon: <PeopleRounded {...iconProps} />,
          color: luminance(colors.palette.green),
        },
        {
          key: FakePageKeys.QRCode,
          title: translate('fakeAppHomeScreen.highlightMosaic'),
          icon: <ScanQrCode {...iconProps} />,
          color: luminance(colors.palette.indigo),
        },
        {
          key: FakePageKeys.Text,
          title: translate('fakeAppHomeScreen.textMosaic'),
          icon: <TextAlt {...iconProps} />,
          color: luminance(colors.palette.purple),
        },
      ],
      [colors.palette],
    );

    function handleNavigate(item: CardItemProps) {
      switch (item.key) {
        case FakePageKeys.ExifViewer:
        case FakePageKeys.ExifEditor:
          props.navigation.navigate('Exif', {
            title: item.title,
            key: item.key,
          });
          break;
        case FakePageKeys.Face:
        case FakePageKeys.QRCode:
        case FakePageKeys.Text:
          props.navigation.navigate('Mosaic', {
            title: item.title,
            key: item.key,
          });
          break;
      }
    }

    function openAppLock() {
      props.navigation.replace('AppLock');
    }

    const gesture = Gesture.Fling()
      .direction(Directions.LEFT)
      .runOnJS(true)
      .onEnd(() => {
        openAppLock();
        HapticFeedback.impact.heavy();
      })
      .enabled(settingsStore.fakeHomeUnlockActions.includes(FakeHomeUnlockActions.Slide));

    const pullRefreshEnabled = useMemo(
      () => settingsStore.fakeHomeUnlockActions.includes(FakeHomeUnlockActions.PullRefresh),
      [settingsStore.fakeHomeUnlockActions],
    );

    const renderItem = useCallback(({ item }) => {
      return <CardItem {...item} onPress={() => handleNavigate(item)} />;
    }, []);

    return (
      <Screen
        style={{
          backgroundColor: colors.background,
        }}
      >
        <GestureDetector gesture={gesture}>
          <FlashList
            style={{
              flex: 1,
            }}
            scrollEnabled={pullRefreshEnabled}
            contentContainerStyle={$list}
            data={list}
            renderItem={renderItem}
            numColumns={2}
            estimatedItemSize={100}
            contentInsetAdjustmentBehavior="automatic"
            {...(pullRefreshEnabled && {
              refreshing: false,
              onRefresh: openAppLock,
            })}
          />
        </GestureDetector>
      </Screen>
    );
  },
);

interface CardItemProps {
  title: string;
  icon: JSX.Element;
  color: string;
  key: FakePageKeys;
  onPress(): void;
}

function CardItem(props: CardItemProps): JSX.Element {
  return (
    <TouchableOpacity style={$cardItem} onPress={props.onPress} activeOpacity={0.8}>
      <View style={[$cardItemBody, { backgroundColor: props.color }]}>
        {props.icon}
        <Text style={$cardItemText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const $cardItem: ViewStyle = {
  width: '100%',
  height: 120,
  borderRadius: radius[3],
  padding: spacing[3],
};

const $list: ContentStyle = {
  paddingTop: spacing[8],
  paddingHorizontal: spacing[3],
};

const $cardItemBody: ViewStyle = {
  flex: 1,
  borderRadius: 12,
  justifyContent: 'space-between',
  padding: spacing[4],
};

const $cardItemText: TextStyle = {
  fontSize: 16,
  fontWeight: '500',
  color: '#fff',
};
