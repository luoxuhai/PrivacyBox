import {
  Image,
  ImageStyle,
  PlatformColor,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextStyle,
  Linking,
} from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

import { ListCell, ListSection } from '@/components';
import { t, locale } from '@/i18n';
import { typography, useTheme } from '@/theme';

const apps = [
  {
    name: t('appPromote.nightVision.name'),
    icon: require('@/assets/icons/app-icon/night-vision.png'),
    description: t('appPromote.nightVision.description'),
    id: t('appPromote.nightVision.id'),
  },
];

if (locale.countryCode === 'CN') {
  apps.push({
    name: t('appPromote.iGrammar.name'),
    icon: require('@/assets/icons/app-icon/igrammar.png'),
    description: t('appPromote.iGrammar.description'),
    id: t('appPromote.iGrammar.id'),
  });
}

export function AppPromoteSection() {
  const { colors } = useTheme();

  return (
    <ListSection titleTk="appPromote.title">
      {apps.map((app, index) => {
        const bottomSeparator = index !== apps.length - 1;

        return (
          <ListCell
            key={app.id}
            style={$recommend}
            bottomSeparator={bottomSeparator}
            onPress={() => {
              Linking.openURL(
                locale.countryCode === 'CN'
                  ? `https://apps.apple.com/cn/app/id${app.id}`
                  : `https://apps.apple.com/app/id${app.id}`,
              );
            }}
          >
            <Image style={$appIcon} source={app.icon} />
            <View style={$body}>
              <Text style={$appName}>{app.name}</Text>
              <Text style={$desc} numberOfLines={2}>{app.description}</Text>
            </View>
            <SFSymbol
              style={$downIcon}
              name="icloud.and.arrow.down"
              weight="medium"
              color={colors.link}
            />
          </ListCell>
        );
      })}
    </ListSection>
  );
}

const $recommend: ViewStyle = {
  paddingHorizontal: 16,
  paddingVertical: 10,
};

const $appIcon: ImageStyle = {
  width: 44,
  height: 44,
  borderRadius: 8,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: PlatformColor('systemGray5'),
  marginRight: 16,
};

const $appName: TextStyle = {
  color: PlatformColor('label'),
  marginBottom: 4,
  ...typography.body,
};

const $desc: TextStyle = {
  color: PlatformColor('secondaryLabel'),
  ...typography.subhead,
  lineHeight: 16
};

const $body: ViewStyle = {
  flex: 1,
};

const $downIcon: ViewStyle = {
  width: 30,
  height: 30,
};
