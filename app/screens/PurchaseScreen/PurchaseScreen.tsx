import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { initConnection, endConnection, getProducts } from 'react-native-iap';
import { useQuery } from 'react-query';

import { SettingStackParamList } from '@/navigators';
import { Screen, ExitButton, TextButton, ScrollSafeAreaView } from '@/components';
import { spacing, useTheme } from '@/theme';
import { Header } from './Header';
import { FeatureList } from './FeatureList';
import { BottomActionBar } from './BottomActionBar';
import Config from '@/config';

let inAppPurchaseConnected = false;

export const PurchaseScreen: FC<StackScreenProps<SettingStackParamList, 'Purchase'>> = observer(
  (props) => {
    const { colors } = useTheme();

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => <ExitButton onPress={props.navigation.goBack} />,
        headerLeft: () => <TextButton tk="purchaseScreen.restore" />,
      });
    }, []);

    const { isLoading, isSuccess } = useQuery(
      'in.app.purchase',
      async () => {
        if (!inAppPurchaseConnected) {
          await connectInAppPurchase();
        }

        await getProducts(Config.productId);
        // await setProducts();
      },
      { enabled: true },
    );

    return (
      <Screen statusBarStyle="inverted">
        <ScrollSafeAreaView contentContainerStyle={$safeAreaView}>
          <Header />
          <FeatureList />
        </ScrollSafeAreaView>
        <BottomActionBar />
      </Screen>
    );
  },
);

// 连接到应用商店
async function connectInAppPurchase() {
  await initConnection();
  inAppPurchaseConnected = true;
}

async function disconnectInAppPurchase() {
  await endConnection();
  inAppPurchaseConnected = false;
}

const $safeAreaView: ViewStyle = {
  paddingHorizontal: spacing[6],
};
