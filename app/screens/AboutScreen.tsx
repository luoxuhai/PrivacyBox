import React, { FC, useEffect, useRef, useState } from 'react';
import { Linking, ViewStyle } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { observer } from 'mobx-react-lite';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { ListSection, ListCell, Screen, SafeAreaScrollView } from '@/components';
import { spacing, useTheme } from '@/theme';
import Config from '@/config';
import { openLinkInAppBrowser, HapticFeedback, Overlay, Application, DynamicUpdate } from '@/utils';
import { i18n, SupportedLanguage, translate } from '@/i18n';
import { SettingStackParamList } from '@/navigators';

export const AboutScreen: FC<StackScreenProps<SettingStackParamList, 'About'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const [labelWithoutPrefix, setLabelWithoutPrefix] = useState<string>();
    // const { navigation } = props;
    // const { settingsStore } = useStores();
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

    // updateMetadata = await CodePush.getUpdateMetadata();

    return (
      <Screen>
        <SafeAreaScrollView contentContainerStyle={$contentContainerStyles}>
          <ListSection>
            <ListCell
              tk="aboutScreen.version"
              RightAccessory={`${Application.version} (${labelWithoutPrefix})`}
              rightIcon={null}
              onPress={() => {
                pressedCount.current++;
                if (pressedCount.current === 10) {
                  pressedCount.current = 0;
                  props.navigation.navigate('Debug');
                }
              }}
            />
            <ListCell
              tk="aboutScreen.changelog"
              onPress={() => {
                openLinkInAppBrowser(
                  i18n.language === SupportedLanguage.ZH
                    ? Config.changelog.zh_cn
                    : Config.changelog.en_us,
                  colors.palette.primary6,
                );
              }}
            />
            <ListCell
              tk="aboutScreen.review"
              onPress={() => {
                Linking.openURL(
                  `https://apps.apple.com/app/apple-store/id${Config.appId}?action=write-review`,
                );
              }}
            />
          </ListSection>
          <ListSection titleTk="aboutScreen.agreement">
            <ListCell
              tk="aboutScreen.private"
              onPress={() => {
                openLinkInAppBrowser(
                  i18n.language === SupportedLanguage.ZH
                    ? Config.privacyPolicy.zh_cn
                    : Config.privacyPolicy.en_us,
                  colors.palette.primary6,
                );
              }}
            />
            <ListCell
              tk="aboutScreen.userAgreement"
              onPress={() => {
                openLinkInAppBrowser(
                  i18n.language === SupportedLanguage.ZH
                    ? Config.userAgreement.zh_cn
                    : Config.userAgreement.en_us,
                  colors.palette.primary6,
                );
              }}
            />
          </ListSection>
          <ListSection titleTk="aboutScreen.connect">
            <ListCell
              tk="aboutScreen.qqGroup"
              RightAccessory={Config.qqGroup}
              onPress={openQQGroup}
            />
            <ListCell tk="aboutScreen.email" RightAccessory={Config.email} onPress={openEmail} />
          </ListSection>
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

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

function openEmail() {
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
