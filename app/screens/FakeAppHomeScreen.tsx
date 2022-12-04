import React, { FC, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, TouchableOpacity, View, TextStyle, EmitterSubscription } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TextAlt, QrCode, MediaImage, PeopleRounded } from 'iconoir-react-native';
import { FlashList, ContentStyle } from '@shopify/flash-list';
import { colord } from 'colord';
import { GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Shake from 'react-native-shake';

import { AppStackParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { radius, spacing, useTheme } from '@/theme';
import { translate } from '@/i18n';
import { useStores } from '@/models';
import { HapticFeedback, Overlay } from '@/utils';
import { FakeHomeUnlockActions } from '@/models/SettingsStore';

function luminance(color: string, l = 0.1) {
  return colord(color).lighten(l).toRgbString();
}

const iconProps = {
  color: '#FFF',
  width: 30,
  height: 30,
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
          title: translate('fakeAppHomeScreen.removeInfo'),
          icon: <MediaImage {...iconProps} />,
          color: luminance(colors.palette.orange),
          name: '',
        },
        {
          title: translate('fakeAppHomeScreen.faceMosaic'),
          icon: <PeopleRounded {...iconProps} />,
          color: luminance(colors.palette.green),
        },
        {
          title: translate('fakeAppHomeScreen.textMosaic'),
          icon: <TextAlt {...iconProps} />,
          color: luminance(colors.palette.indigo),
        },
        {
          title: translate('fakeAppHomeScreen.QRCodeMosaic'),
          icon: <QrCode {...iconProps} />,
          color: luminance(colors.palette.pink),
        },
      ],
      [colors.palette],
    );

    function handleNavigate() {
      Overlay.toast({
        title: translate('common.coming'),
        preset: 'error',
      });
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
            renderItem={({ item }) => <CardItem {...item} onPress={handleNavigate} />}
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
