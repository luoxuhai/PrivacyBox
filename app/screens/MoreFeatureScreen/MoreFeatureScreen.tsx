import React from 'react';
import { Text, View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colord } from 'colord';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatGrid, ContentStyle, Screen } from '@/components';
import { colors, radius, spacing } from '@/theme';
import { TextKeyPath, translate } from '@/i18n';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaDimensions } from '@/utils';
import { SFSymbol } from 'react-native-sfsymbols';
import { observer } from 'mobx-react-lite';

interface FeatureItem {
  title: TextKeyPath;
  icon: string;
  color: string;
}

const iconProps = {
  color: '#FFF',
  width: 36,
  height: 36,
};

function luminance(color: string, l = 0.1) {
  return colord(color).lighten(l).toRgbString();
}

const list: FeatureItem[] = [
  {
    title: 'icloudScreen.title',
    icon: 'arrow.clockwise.icloud.fill',
    color: luminance(colors.light.palette.blue),
  },
  {
    title: 'transferScreen.title',
    icon: 'wifi.circle.fill',
    color: luminance(colors.light.palette.orange),
  },
  {
    title: 'wastebasketScreen.title',
    icon: 'basket.fill',
    color: luminance(colors.light.palette.green),
  },
  {
    title: 'hideApplicationsScreen.title',
    icon: 'eye.slash.fill',
    color: luminance(colors.light.palette.purple),
  },
];

export const MoreFeatureScreen = observer(() => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const safeAreaDimensions = useSafeAreaDimensions();

  return (
    <Screen>
      <SafeAreaView style={$safeAreaView} edges={['left', 'right']}>
        <FlatGrid
          contentContainerStyle={{
            paddingBottom: bottomTabBarHeight,
          }}
          data={list}
          renderItem={({ item }) => <FeatureItemView {...item} />}
          estimatedItemSize={100}
          contentInsetAdjustmentBehavior="automatic"
          itemWidth={160}
          width={safeAreaDimensions.width}
          itemWidthFixed={false}
          spacing={16}
        />
      </SafeAreaView>
    </Screen>
  );
});

interface FeatureItemViewProps extends FeatureItem {
  onPress(): void;
}

function FeatureItemView(props: FeatureItemViewProps): JSX.Element {
  return (
    <TouchableOpacity style={$cardItem} onPress={props.onPress} activeOpacity={0.8}>
      <View style={[$cardItemBody, { backgroundColor: props.color }]}>
        <SFSymbol name={props.icon} {...iconProps} />
        <Text style={$cardItemText}>{translate(props.title)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const $safeAreaView: ViewStyle = {
  flex: 1,
};

const $cardItem: ViewStyle = {
  flex: 1,
  height: 110,
  borderRadius: radius[3],
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
