import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import {
  ViewStyle,
  View,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
  LayoutRectangle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { Product } from 'react-native-iap';

import { TextButton, BlurView, Button, Text } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { openPrivacyPolicy, openUserAgreement } from '@/screens/AboutScreen';
import { purchaseKeys } from './constants';
import { InAppPurchase } from './helpers/InAppPurchase';
import Config from '@/config';
import { Overlay } from '@/utils';
import { translate } from '@/i18n';
import { useStores } from '@/models';

interface BottomActionBarProps {
  onLayout(layout: LayoutRectangle): void;
}

export const BottomActionBar = observer<BottomActionBarProps>((props) => {
  const safeAreaInsets = useSafeAreaInsets();
  const {
    purchaseStore: { isPurchased },
  } = useStores();
  const { colors, isDark } = useTheme();

  const { data: product, isLoading } = useQuery<Product>(purchaseKeys.product, { enabled: true });

  const handleBuyPurchase = useCallback(() => {
    Overlay.alert({
      preset: 'spinner',
      title: translate('purchaseScreen.purchasing'),
      duration: 0,
    });
    InAppPurchase.shared.requestPurchase(Config.productId);
  }, []);

  return (
    <View
      style={[
        $bottomAction,
        {
          paddingBottom: safeAreaInsets.bottom,
          paddingLeft: safeAreaInsets.left + spacing[5],
          paddingRight: safeAreaInsets.right + spacing[5],
        },
      ]}
      onLayout={(event) => {
        props.onLayout(event.nativeEvent.layout);
      }}
    >
      <BlurView
        style={$blurView}
        blurType={isDark ? 'materialDark' : 'materialLight'}
        blurAmount={60}
      />
      <Text color={colors.secondaryLabel} style={typography.footnote} tk="purchaseScreen.help" />

      <View style={$body}>
        <View style={$agreementWrapper}>
          <TextButton
            style={[
              $agreementText,
              {
                marginRight: spacing[4],
              },
            ]}
            tk="aboutScreen.private"
            onPress={() => openPrivacyPolicy(true)}
          />
          <TextButton
            style={$agreementText}
            tk="aboutScreen.userAgreement"
            onPress={() => openUserAgreement(true)}
          />
        </View>
        <Button
          style={$buyButton}
          tk={isPurchased ? 'purchaseScreen.purchased' : 'purchaseScreen.buyButton'}
          tkOptions={
            isPurchased
              ? null
              : {
                  price: product?.localizedPrice,
                }
          }
          disabled={!product || isPurchased}
          {...(!isPurchased && {
            LeftAccessory: isLoading ? (
              <ActivityIndicator style={$activityIndicator} color={colors.palette.white} />
            ) : null,
          })}
          onPress={handleBuyPurchase}
        />
      </View>
    </View>
  );
});

const $bottomAction: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  zIndex: 9,
  width: '100%',
  paddingTop: spacing[5],
  backgroundColor: 'transparent',
  alignContent: 'space-between',
  justifyContent: 'center',
};

const $blurView: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
};

const $title: TextStyle = {
  ...typography.title3,
  fontWeight: '500',
};

const $buyButton: ViewStyle = {
  // maxWidth: 160,
};

const $agreementWrapper: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const $body: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: spacing[4],
};

const $agreementText: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const $activityIndicator: ViewStyle = {
  marginRight: spacing[2],
};
