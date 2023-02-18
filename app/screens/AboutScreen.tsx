import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import { Linking, ViewStyle } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { observer } from 'mobx-react-lite';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import CodePush from 'react-native-code-push';
import * as MailComposer from 'expo-mail-composer';
import VersionCheck from 'react-native-version-check';

import { ListSection, ListCell, Screen, SafeAreaScrollView } from '@/components';
import { spacing, useTheme, colors } from '@/theme';
import Config from '@/config';
import {
  openLinkInAppBrowser,
  HapticFeedback,
  Overlay,
  Application,
  DynamicUpdate,
  Device,
} from '@/utils';
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

    const handleCheckUpdate = useCallback(async () => {
      Overlay.alert({
        preset: 'spinner',
        duration: 0,
        title: t('aboutScreen.checkingUpdate'),
      });

      const { isNeeded } = await VersionCheck.needUpdate();
      if (isNeeded) {
        Linking.openURL(Config.appStoreUrl.urlSchema);
      } else {
        CodePush.sync(
          {
            installMode: CodePush.InstallMode.IMMEDIATE,
            mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
          },
          (status) => {
            if (status === CodePush.SyncStatus.UP_TO_DATE) {
              Overlay.alert({
                preset: 'done',
              });
            } else if (
              [
                CodePush.SyncStatus.UPDATE_INSTALLED,
                CodePush.SyncStatus.AWAITING_USER_ACTION,
                CodePush.SyncStatus.INSTALLING_UPDATE,
              ].includes(status)
            ) {
              Overlay.dismissAllAlerts();
              setTimeout(() => {
                CodePush.restartApp();
              }, 500);
            } else if (status === CodePush.SyncStatus.UNKNOWN_ERROR) {
              Overlay.alert({
                preset: 'error',
              });
            }
          },
        );
      }
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

export async function openDeveloperEmail() {
  try {
    await MailComposer.composeAsync({
      recipients: [Config.email],
      subject: '隐私盒子反馈',
      body: `


             Device: ${Device.modelName}
             iOS Version: ${Device.version}
             App Version: ${Application.version}
             Local Version: ${Config.dist}
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
