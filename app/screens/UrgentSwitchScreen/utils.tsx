import React from 'react';
import { SFSymbol } from 'react-native-sfsymbols';

import { ThemeStore } from '@/models/ThemeStore';
import { TextKeyPath, locale } from '@/i18n';
import { ImageIcon, ImageIconTypes } from '@/components';
import { AppQueriesSchemes } from './type';
import { spacing } from '@/theme';

export function getUrgentOptions(colors: ThemeStore['colors']) {
  const baseOptions: {
    title: TextKeyPath | string;
    value: AppQueriesSchemes | null;
    icon: React.ReactElement;
  }[] = [
    {
      value: AppQueriesSchemes.Disable,
      icon: (
        <SFSymbol
          style={{
            marginLeft: 15,
            marginRight: spacing[5],
          }}
          name="xmark.circle"
          size={28}
          color={colors.secondaryLabel}
        />
      ),
      title: 'common.cancel',
    },
    {
      value: AppQueriesSchemes.Notes,
      icon: <AppIcon icon="Notes" />,
      title: 'thirdPartyApp.note',
    },
    {
      value: AppQueriesSchemes.Safari,
      icon: <AppIcon noRadius icon="Safari" />,
      title: 'thirdPartyApp.browser',
    },
    {
      value: AppQueriesSchemes.Photos,
      icon: <AppIcon noRadius icon="Photos" />,
      title: 'thirdPartyApp.album',
    },
    {
      value: AppQueriesSchemes.Mailto,
      icon: <AppIcon icon="Mail" />,
      title: 'thirdPartyApp.email',
    },
  ];

  let options = baseOptions;

  if (locale.country === 'CN') {
    options = [
      ...baseOptions,
      ...[
        {
          value: AppQueriesSchemes.QQ,
          icon: <AppIcon icon="QQ" />,
          title: 'thirdPartyApp.qq',
        },
        {
          value: AppQueriesSchemes.Weixin,
          icon: <AppIcon icon="WeChat" />,
          title: 'thirdPartyApp.wechat',
        },
        {
          value: AppQueriesSchemes.Douyin,
          icon: <AppIcon icon="TikTok" />,
          title: 'thirdPartyApp.douyin',
        },
        {
          value: AppQueriesSchemes.Kwai,
          icon: <AppIcon icon="Kwai" />,
          title: 'thirdPartyApp.kwai',
        },
        {
          value: AppQueriesSchemes.Bilibili,
          icon: <AppIcon icon="Bilibili" />,
          title: 'thirdPartyApp.bilibili',
        },
      ],
    ];
  } else {
    options = [
      ...baseOptions,
      ...[
        {
          value: AppQueriesSchemes.Facebook,
          icon: <AppIcon icon="Facebook" />,
          title: 'thirdPartyApp.facebook',
        },
        {
          value: AppQueriesSchemes.Twitter,
          icon: <AppIcon icon="Twitter" />,
          title: 'thirdPartyApp.twitter',
        },
        {
          value: AppQueriesSchemes.TikTok,
          icon: <AppIcon icon="TikTok" />,
          title: 'thirdPartyApp.tikTok',
        },
        {
          value: AppQueriesSchemes.Instagram,
          icon: <AppIcon icon="Instagram" />,
          title: 'thirdPartyApp.instagram',
        },
        {
          value: AppQueriesSchemes.WeChat,
          icon: <AppIcon icon="WeChat" />,
          title: 'thirdPartyApp.wechat',
        },
      ],
    ];
  }
  return options;
}

const AppIcon = ({ icon, noRadius = false }: { icon: ImageIconTypes; noRadius?: boolean }) => (
  <ImageIcon
    style={[
      $appIcon,
      !noRadius && {
        borderRadius: 4,
      },
    ]}
    icon={icon}
  />
);

const $appIcon = {
  width: 30,
  height: 30,
};
