import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { Linking, ViewStyle } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { observer } from 'mobx-react-lite';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import CodePush from 'react-native-code-push';

import { ListSection, ListCell, Screen, SafeAreaScrollView } from '@/components';
import { spacing, useTheme, colors } from '@/theme';
import Config from '@/config';
import { openLinkInAppBrowser, HapticFeedback, Overlay, Application, DynamicUpdate } from '@/utils';
import { i18n, SupportedLanguage, t, translate } from '@/i18n';
import { SettingStackParamList } from '@/navigators';

export const AboutScreen: FC<StackScreenProps<SettingStackParamList, 'About'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const [labelWithoutPrefix, setLabelWithoutPrefix] = useState<string>();
    const pressedCount = useRef<number>(0);
    const bottomTabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
      DynamicUpdate.getUpdateMetadataAsync().then((res) => {
        setLabelWithoutPrefix(res?.label?.replace('v', '') || '0');
      });
    }, []);

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

    const handleCheckUpdate = useCallback(() => {
      Overlay.alert({
        preset: 'spinner',
        duration: 0,
        title: t('aboutScreen.checkUpdate'),
      });
      CodePush.sync(
        {
          installMode: CodePush.InstallMode.IMMEDIATE,
          mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
        },
        (status) => {
          if (status === CodePush.SyncStatus.UP_TO_DATE) {
            Overlay.alert({
              title: '已是最新版',
              preset: 'done',
            });
          } else if (status !== CodePush.SyncStatus.CHECKING_FOR_UPDATE) {
            Overlay.dismissAllAlerts();
          }
        },
      );
    }, []);

    return (
      <Screen type="tabView">
        <SafeAreaScrollView contentContainerStyle={$contentContainerStyles}>
          <ListSection>
            <ListCell
              tk="aboutScreen.version"
              RightAccessory={`${Application.version}(${Application.buildNumber})-${labelWithoutPrefix}`}
              rightIcon={null}
              onPress={handleOpenDebug}
              onLongPress={handleCheckUpdate}
            />
            <ListCell
              tk="aboutScreen.changelog"
              onPress={() => {
                openLinkInAppBrowser(
                  i18n.language === SupportedLanguage.ZH
                    ? Config.changelog.zh_cn
                    : Config.changelog.en_us,
                  {
                    preferredControlTintColor: colors.palette.primary6,
                  },
                );
              }}
            />
            <ListCell
              tk="aboutScreen.review"
              bottomSeparator={false}
              onPress={() => {
                Linking.openURL(
                  `https://apps.apple.com/app/apple-store/id${Config.appId}?action=write-review`,
                );
              }}
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
          <ListSection titleTk="aboutScreen.connect">
            <ListCell
              tk="aboutScreen.qqGroup"
              RightAccessory={Config.qqGroup}
              onPress={openQQGroup}
            />
            <ListCell
              tk="aboutScreen.email"
              bottomSeparator={false}
              RightAccessory={Config.email}
              onPress={openDeveloperEmail}
            />
          </ListSection>
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

/**
 * 打开 QQ 群
 */
function openQQGroup() {
  Linking.openURL(
    `mqq://card/show_pslcard?src_type=internal&version=1&uin=${Config.qqGroup}&key=d6758f2f4dee2c7e73a455f674a888651b0c05e24904f7001cbad20f7f859f82&card_type=group&source=external`,
  ).catch(() => {
    Clipboard.setString(Config.qqGroup);
    Overlay.toast({
      title: translate('aboutScreen.qqGroupCopied'),
      preset: 'done',
      haptic: HapticFeedback.enabled ? 'success' : 'none',
    });
  });
}

export function openDeveloperEmail() {
  Linking.openURL(`mailto:${Config.email}`).catch(() => {
    Clipboard.setString(Config.email);
    Overlay.toast({
      title: translate('aboutScreen.emailCopied'),
      preset: 'done',
      haptic: HapticFeedback.enabled ? 'success' : 'none',
    });
  });
}

const $contentContainer: ViewStyle = {
  paddingTop: spacing[5],
  paddingHorizontal: spacing[6],
};
