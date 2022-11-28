import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, TouchableOpacity, View, TextStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { TextAlt, QrCode, MediaImage, PeopleRounded } from 'iconoir-react-native';
import { FlashList, ContentStyle } from '@shopify/flash-list';
import { colord } from 'colord';

import { AppStackParamList } from '@/navigators';
import { Screen, Text } from '@/components';
import { radius, spacing, useTheme } from '@/theme';
import { Overlay } from '@/utils';
import { translate } from '@/i18n';

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
      // props.navigation.replace('AppLock');
    }

    return (
      <Screen
        style={{
          backgroundColor: colors.background,
        }}
      >
        <FlashList
          contentContainerStyle={$list}
          data={list}
          renderItem={({ item }) => <CardItem {...item} onPress={handleNavigate} />}
          numColumns={2}
          contentInsetAdjustmentBehavior="automatic"
        />
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
