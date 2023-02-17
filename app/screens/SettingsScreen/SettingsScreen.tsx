import React, { FC, useMemo } from 'react';
import { Share, ViewStyle, Linking } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';

import { PurchaseBanner } from '../PurchaseScreen/PurchaseBanner';
import { Switch, Screen, SafeAreaScrollView, ListCell, ListSection } from '@/components';
import { useTheme } from '@/theme/useTheme';
import { spacing } from '@/theme';
import { SettingStackParamList } from '@/navigators';
import { useStores } from '@/models';
import Config from '@/config';
import { Device, Application, openLinkInAppBrowser } from '@/utils';
import { SupportedLanguage, i18n, LanguageReadable, translate } from '@/i18n';
import { getUrgentOptions } from '../UrgentSwitchScreen/utils';
import { AppQueriesSchemes } from '../UrgentSwitchScreen/type';

export const SettingScreen: FC<StackScreenProps<SettingStackParamList, 'Settings'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const { navigation } = props;
    const { settingsStore, appLockStore } = useStores();
    const bottomTabBarHeight = useBottomTabBarHeight();

    const $contentContainerStyles = [
      $contentContainer,
      {
        paddingBottom: bottomTabBarHeight,
      },
    ];

    const preferredControlTintColor = colors.palette.primary6;

    const currentUrgentSwitchTargetText = useMemo(() => {
      const target = getUrgentOptions(colors).find(
        (o) => o.value === settingsStore.urgentSwitchTarget,
      );
      return target.value === AppQueriesSchemes.Disable ? null : translate(target.title);
    }, [settingsStore.urgentSwitchTarget]);

    const purchaseBannerVisibled = !appLockStore.inFakeEnvironment;

    return (
      <Screen type="tabView">
        <SafeAreaScrollView contentContainerStyle={$contentContainerStyles}>
          {purchaseBannerVisibled && <PurchaseBanner />}
          <ListSection
            style={
              purchaseBannerVisibled
                ? {
                    marginTop: spacing[8],
                  }
                : {}
            }
            titleTk="settingsScreen.security"
          >
            <ListCell
              tk="appLockSettingsScreen.title"
              visible={!appLockStore.inFakeEnvironment}
              onPress={() => {
                navigation.navigate('AppLockSettings');
              }}
            />
            <ListCell
              tk="fakeAppLockSettingsScreen.title"
              visible={!appLockStore.inFakeEnvironment}
              RightAccessory={translate(
                appLockStore.fakePasscodeEnabled ? 'common.enabled' : 'common.disabled',
              )}
              onPress={() => {
                navigation.navigate('FakeAppLockSettings');
              }}
            />
            <ListCell
              tk="fakeAppHomeSettingsScreen.title"
              RightAccessory={translate(
                settingsStore.fakeHomeEnabled ? 'common.enabled' : 'common.disabled',
              )}
              visible={Application.env !== 'TestFlight'}
              onPress={() => {
                navigation.navigate('FakeAppHomeSettings');
              }}
            />
            <ListCell
              tk="urgentSwitchScreen.title"
              bottomSeparator={false}
              RightAccessory={currentUrgentSwitchTargetText}
              onPress={() => {
                navigation.navigate('UrgentSwitch');
              }}
            />
          </ListSection>
          <ListSection titleTk="settingsScreen.preference">
            <ListCell
              tk="advancedSettingsScreen.title"
              onPress={() => {
                navigation.navigate('AdvancedSettings');
              }}
            />

            <ListCell
              tk="appearanceScreen.title"
              onPress={() => {
                navigation.navigate('Appearance');
              }}
            />
            <ListCell
              tk="settingsScreen.language"
              RightAccessory={LanguageReadable[i18n.language]}
              onPress={Linking.openSettings}
            />
            <ListCell
              tk="settingsScreen.hapticFeedbackSwitch"
              bottomSeparator={false}
              rightIcon={
                <Switch
                  value={settingsStore.hapticFeedback}
                  onValueChange={settingsStore.setHapticFeedback}
                />
              }
            />
          </ListSection>

          <ListSection titleTk="settingsScreen.help">
            <ListCell
              tk="settingsScreen.FAQ"
              visible={!appLockStore.inFakeEnvironment}
              onPress={() => {
                openLinkInAppBrowser(`${Config.TXC_FEEDBACK_URL}/faqs-more`, {
                  preferredControlTintColor,
                });
              }}
            />
            <ListCell
              tk="settingsScreen.feedback"
              visible={!appLockStore.inFakeEnvironment}
              onPress={() => {
                openLinkInAppBrowser(generateFeedbackUrl(), {
                  preferredControlTintColor,
                });
              }}
            />
            <ListCell
              tk="settingsScreen.share"
              onPress={() => {
                const url =
                  i18n.language === SupportedLanguage.ZH
                    ? Config.appStoreUrl.cn
                    : Config.appStoreUrl.global;

                Share.share({
                  url,
                });
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
            <ListCell
              tk="aboutScreen.title"
              bottomSeparator={false}
              onPress={() => {
                navigation.navigate('About');
              }}
            />
          </ListSection>
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

function generateFeedbackUrl() {
  const url = `${Config.TXC_FEEDBACK_URL}?os=${Device.os || '-'}&osVersion=${
    Device.version || '-'
  }&clientVersion=${Application.version || '-'}&customInfo=${JSON.stringify({
    modelName: Device.modelName || '-',
    // userId: user.current?.id || '-',
  })}`;
  return url;
}

const $contentContainer: ViewStyle = {
  paddingTop: spacing[6],
  paddingHorizontal: spacing[6],
};
