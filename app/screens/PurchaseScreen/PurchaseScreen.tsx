import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useQuery } from '@tanstack/react-query';

import { SettingStackParamList } from '@/navigators';
import { Screen, ExitButton, TextButton, ScrollSafeAreaView } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
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
      console.log('PurchaseScreen');
      props.navigation.setOptions({
        headerRight: () => <ExitButton onPress={props.navigation.goBack} />,
        headerLeft: () => (
          <TextButton
            textStyle={typography.headline}
            tk="purchaseScreen.restore"
            onPress={handleRestorePurchase}
          />
        ),
      });

      return () => {
        Overlay.dismissAllAlerts();
        InAppPurchase.shared.destroy();
      };
    }, []);

    useQuery({
      queryKey: purchaseKeys.product,
      queryFn: async () => {
        await InAppPurchase.shared.init(Config.productId, handleBackDelay);
        return await InAppPurchase.shared.getProduct();
      },
      enabled: true,
      cacheTime: 0,
    });

    function handleBackDelay() {
      setTimeout(() => {
        props.navigation.goBack();
      }, 2000);
    }

    // 恢复购买
    const handleRestorePurchase = async () => {
      Overlay.alert({
        preset: 'spinner',
        title: translate('purchaseScreen.restoring'),
        duration: 0,
        shouldDismissByTap: false,
      });

      try {
        const isPurchased = await InAppPurchase.shared.restorePurchase();
        // 恢复成功
        if (isPurchased) {
          InAppPurchase.shared.setPurchasedState(true);
          Overlay.alert({
            preset: 'done',
            title: translate('purchaseScreen.restoreSuccess'),
          });
          handleBackDelay();
        } else {
          throw Error('No purchase history');
        }
      } catch (error) {
        // 恢复失败
        InAppPurchase.shared.setPurchasedState(false);
        Overlay.alert({
          preset: 'error',
          title: translate('purchaseScreen.restoreFail'),
          message: error.message || '',
        });
      }
    };

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
