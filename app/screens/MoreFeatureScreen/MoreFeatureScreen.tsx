import React from 'react';
import { ViewStyle } from 'react-native';
import { colord } from 'colord';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { FlatGrid, Screen } from '@/components';
import { colors } from '@/theme';
import { useSafeAreaDimensions } from '@/utils';
import { MoreFeatureNavigatorParamList } from '@/navigators';
import { FeatureItemView, FeatureItem } from './FeatureItemView';

function luminance(color: string, l = 0.1) {
  return colord(color).lighten(l).toRgbString();
}

const list: FeatureItem[] = [
  {
    title: 'icloudScreen.title',
    subtitle: 'icloudScreen.subtitle',
    icon: 'arrow.clockwise.icloud.fill',
    color: luminance(colors.light.palette.blue),
  },
  {
    title: 'transferScreen.title',
    subtitle: 'transferScreen.subtitle',
    icon: 'wifi.circle.fill',
    color: luminance(colors.light.palette.orange),
  },
  {
    title: 'hideApplicationsScreen.title',
    subtitle: 'hideApplicationsScreen.subtitle',
    icon: 'eye.slash.fill',
    color: luminance(colors.light.palette.purple),
  },
  {
    title: 'wastebasketScreen.title',
    icon: 'basket.fill',
    color: luminance(colors.light.palette.green),
  },
];

export const MoreFeatureScreen = observer<
  StackScreenProps<MoreFeatureNavigatorParamList, 'MoreFeature'>
>((props) => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const safeAreaDimensions = useSafeAreaDimensions();

  const handleToScreen = () => {
    props.navigation.navigate('HideApplications');
  };

  return (
    <Screen>
      <SafeAreaView style={$safeAreaView} edges={['left', 'right']}>
        <FlatGrid
          contentContainerStyle={{
            paddingBottom: bottomTabBarHeight,
          }}
          data={list}
          renderItem={({ item }) => <FeatureItemView {...item} onPress={() => handleToScreen()} />}
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

const $safeAreaView: ViewStyle = {
  flex: 1,
};
