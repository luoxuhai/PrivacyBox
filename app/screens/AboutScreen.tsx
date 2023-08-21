import React, { FC, useRef, useCallback } from 'react';
import { Linking, ViewStyle } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { observer } from 'mobx-react-lite';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import * as MailComposer from 'expo-mail-composer';
import VersionCheck from 'react-native-version-check';

import { ListSection, ListCell, Screen, SafeAreaScrollView } from '@/components';
import { spacing, useTheme, colors } from '@/theme';
import Config from '@/config';
import { openLinkInAppBrowser, HapticFeedback, Overlay, Application, Device } from '@/utils';
import { i18n, SupportedLanguage, t, translate } from '@/i18n';
import { SettingStackParamList } from '@/navigators';

export const AboutScreen: FC<StackScreenProps<SettingStackParamList, 'About'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const pressedCount = useRef<number>(0);
    const bottomTabBarHeight = useBottomTabBarHeight();

    const $contentContainerStyles = [
      $contentContainer,
      {
        paddingBottom: bottomTabBarHeight,
      },
    ];

    const handleOpenDebug = useCallback(() => {
      pressedCount.current++;
      if (__DEV__ || pressedCount.current === 10) {
        pressedCount.current = 0;
        props.navigation.navigate('Debug');
      }
    }, []);

    const handleCheckUpdate = useCallback(async () => {
      Overlay.alert({
        preset: 'spinner',
        duration: 0,
        title: t('aboutScreen.checkingUpdate'),
      });

      const { isNeeded = false } = (await VersionCheck.needUpdate()) ?? {};
      if (isNeeded) {
        Linking.openURL(Config.appStoreUrl.urlSchema);
      } else {
        Overlay.alert({
          preset: 'done',
        });
      }
    }, []);

    return (
      <Screen type="tabView">
        <SafeAreaScrollView contentContainerStyle={$contentContainerStyles}>
          <ListSection>
            <ListCell
              tk="aboutScreen.version"
              RightAccessory={`${Application.version}(${Application.buildNumber})`}
              rightIcon={null}
              onPress={handleOpenDebug}
            />
            <ListCell
              textStyle={{
                color: colors.palette.primary6,
              }}
              tk="aboutScreen.checkUpdate"
              rightIcon={null}
              bottomSeparator={false}
              onPress={handleCheckUpdate}
            />
          </ListSection>
          <ListSection titleTk="aboutScreen.agreement">
            <ListCell tk="aboutScreen.private" onPress={() => openPrivacyPolicy()} />
            <ListCell
              tk="aboutScreen.userAgreement"
              bottomSeparator={false}
              onPress={() => openUserAgreement()}
            />
          </ListSection>
          {/* <ListSection titleTk="aboutScreen.connect">
            <ListCell
              tk="aboutScreen.email"
              bottomSeparator={false}
              RightAccessory={Config.email}
              onPress={openDeveloperEmail}
            />
          </ListSection> */}
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

export function openUserAgreement(modalEnabled = false) {
  openLinkInAppBrowser(
    i18n.language === SupportedLanguage.ZH
      ? Config.userAgreement.zh_cn
      : Config.userAgreement.en_us,
    { preferredControlTintColor: colors.light.palette.primary6, modalEnabled },
  );
}

export function openPrivacyPolicy(modalEnabled = false) {
  openLinkInAppBrowser(
    i18n.language === SupportedLanguage.ZH
      ? Config.privacyPolicy.zh_cn
      : Config.privacyPolicy.en_us,
    { preferredControlTintColor: colors.light.palette.primary6, modalEnabled },
  );
}

export async function openDeveloperEmail() {
  try {
    await MailComposer.composeAsync({
      recipients: [Config.email],
      subject: '隐私盒子反馈',
      body: `


             Device: ${Device.modelName}
             iOS Version: ${Device.version}
             App Version: ${Application.version}
             User Id: ${Device.uniqueId}
      `,
    });
  } catch (error) {
    Linking.openURL(`mailto:${Config.email}`).catch(() => {
      Clipboard.setString(Config.email);
      Overlay.toast({
        title: translate('aboutScreen.emailCopied'),
        preset: 'done',
        haptic: HapticFeedback.enabled ? 'success' : 'none',
      });
    });
  }
}

const $contentContainer: ViewStyle = {
  paddingTop: spacing[5],
  paddingHorizontal: spacing[6],
};
