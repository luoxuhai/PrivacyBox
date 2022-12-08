import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { initConnection, endConnection, getProducts, Product } from 'react-native-iap';
import { useQuery } from 'react-query';

import { SettingStackParamList } from '@/navigators';
import { Screen, ExitButton, TextButton, ScrollSafeAreaView } from '@/components';
import { spacing, useTheme } from '@/theme';
import { Header } from './Header';
import { FeatureList } from './FeatureList';
import { BottomActionBar } from './BottomActionBar';
import { InAppPurchase } from './helpers/InAppPurchase';
import Config from '@/config';
import { purchaseKeys } from './constants';
import { Overlay } from '@/utils';
import { translate } from '@/i18n';

export const PurchaseScreen: FC<StackScreenProps<SettingStackParamList, 'Purchase'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const [bottomHeight, setBottomHeight] = useState<number>();

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => <ExitButton onPress={props.navigation.goBack} />,
        headerLeft: () => (
          <TextButton tk="purchaseScreen.restore" onPress={handleRestorePurchase} />
        ),
      });

      const removeUpdatedListener = InAppPurchase.shared.addPurchaseUpdatedListener(() => {});
      const removeErrorListener = InAppPurchase.shared.addPurchaseErrorListener(() => {});
      return () => {
        Overlay.dismissAllAlerts();
        removeUpdatedListener();
        removeErrorListener();
      };
    }, []);

    const {
      isLoading,
      isSuccess,
      data: product,
    } = useQuery(
      purchaseKeys.product,
      async () => {
        await InAppPurchase.shared.init();
        return await InAppPurchase.shared.getProduct(Config.productId);
      },
      { enabled: true },
    );

    // 恢复购买
    const handleRestorePurchase = async () => {
      Overlay.alert({
        preset: 'spinner',
        title: translate('purchaseScreen.restoring'),
        duration: 0,
        shouldDismissByTap: false,
      });

      try {
        const isPurchased = await InAppPurchase.shared.restorePurchase(Config.productId);
        if (isPurchased) {
          console.log('[RestorePurchase]');
        }
      } catch (error) {}

      Overlay.dismissAllAlerts();
    };

    console.prettyLog(product);

    return (
      <Screen
        style={{
          backgroundColor: colors.background,
        }}
        statusBarStyle="inverted"
      >
        <ScrollSafeAreaView
          contentContainerStyle={[
            $safeAreaView,
            {
              paddingBottom: bottomHeight,
            },
          ]}
        >
          <Header />
          <FeatureList />
        </ScrollSafeAreaView>
        <BottomActionBar onLayout={({ height }) => setBottomHeight(height)} />
      </Screen>
    );
  },
);

const $safeAreaView: ViewStyle = {
  paddingHorizontal: spacing[6],
};
