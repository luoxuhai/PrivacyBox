import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, View, StyleSheet, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TextButton, BlurView, Button, Text } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { openPrivacyPolicy, openUserAgreement } from '@/screens/AboutScreen';

export const BottomActionBar = observer(() => {
  const safeAreaInsets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        $bottomAction,
        {
          height: 100,
          paddingBottom: safeAreaInsets.bottom,
          paddingLeft: safeAreaInsets.left + spacing[5],
          paddingRight: safeAreaInsets.right + spacing[5],
        },
      ]}
    >
      <BlurView style={$blurView} blurType="materialLight" blurAmount={60} />
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
        <Button style={$buyButton} tk="purchaseScreen.buyButton" />
      </View>
    </View>
  );
});

const $bottomAction: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  zIndex: 9,
  width: '100%',
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
  maxWidth: 160,
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
