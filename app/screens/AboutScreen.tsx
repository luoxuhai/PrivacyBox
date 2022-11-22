import React, { FC } from 'react';
import { Text, Linking, ViewStyle } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { observer } from 'mobx-react-lite';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { ListSection, ListCell, Screen, SafeAreaScrollView } from '@/components';
import { useStores } from '@/models';
import { spacing, typography, useTheme } from '@/theme';
import Config from '@/config';
import { openLinkInAppBrowser, HapticFeedback, Overlay } from '@/utils';
import { i18n, SupportedLanguage } from '@/i18n';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigators';

export const AboutScreen: FC<StackScreenProps<SettingStackParamList, 'About'>> = observer(
  (props) => {
    // const { colors, appearance } = useTheme();
    // const { navigation } = props;
    // const { settingsStore } = useStores();
    const bottomTabBarHeight = useBottomTabBarHeight();

    const $contentContainerStyles = [
      $contentContainer,
      {
        paddingBottom: bottomTabBarHeight,
      },
    ];

    return (
      <Screen>
        <SafeAreaScrollView contentContainerStyle={$contentContainerStyles}>
          <ListSection>
            <ListCell
              tk="aboutScreen.version"
              RightAccessory={<ExtraText text="1.12.0" />}
              rightIcon={null}
              onLongPress={() => {
                props.navigation.navigate('Debug');
              }}
            />
            <ListCell
              tk="aboutScreen.changelog"
              onPress={() => {
                openLinkInAppBrowser(
                  i18n.language === SupportedLanguage.ZH
                    ? Config.changelog.zh_cn
                    : Config.changelog.en_us,
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
                );
              }}
            />
          </ListSection>
          <ListSection titleTk="aboutScreen.connect">
            <ListCell
              tk="aboutScreen.qqGroup"
              RightAccessory={<ExtraText text={Config.qqGroup} />}
              onPress={openQQGroup}
            />
            <ListCell
              tk="aboutScreen.email"
              RightAccessory={<ExtraText text={Config.email} />}
              onPress={openEmail}
            />
          </ListSection>
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

const ExtraText = observer(({ text }: { text: string }) => {
  const { colors } = useTheme();
  return <Text style={[$extraText, { color: colors.secondaryLabel }]}>{text}</Text>;
});

/**
 * 打开 QQ 群
 */
function openQQGroup() {
  Linking.openURL(
    `mqq://card/show_pslcard?src_type=internal&version=1&uin=${Config.qqGroup}&key=d6758f2f4dee2c7e73a455f674a888651b0c05e24904f7001cbad20f7f859f82&card_type=group&source=external`,
  ).catch(() => {
    Clipboard.setString(Config.qqGroup);
    Overlay.toast({
      title: '已复制群号',
      preset: 'done',
      haptic: HapticFeedback.enabled ? 'success' : 'none',
    });
  });
}

function openEmail() {
  Linking.openURL(`mailto:${Config.email}`).catch(() => {
    Clipboard.setString(Config.email);
    Overlay.toast({
      title: '已复制邮箱',
      preset: 'done',
      haptic: HapticFeedback.enabled ? 'success' : 'none',
    });
  });
}

const $contentContainer: ViewStyle = {
  paddingTop: spacing[6],
  paddingHorizontal: spacing[6],
};

const $extraText: ViewStyle = {
  ...typography.subhead,
};
