import * as React from 'react';
import { Image, ImageStyle, StyleProp, TouchableOpacityProps } from 'react-native';

export type ImageIconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: ImageIconTypes;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;
}

export function ImageIcon(props: IconProps) {
  const { icon, color, size, style } = props;

  return (
    <Image
      style={[
        $imageStyle,
        color && { tintColor: color },
        size && { width: size, height: size },
        style,
      ]}
      source={iconRegistry[icon]}
    />
  );
}

export const iconRegistry = {
  Instagram: require('@/assets/icons/app.icon/Instagram.png'),
  Bilibili: require('@/assets/icons/app.icon/Bilibili.png'),
  Facebook: require('@/assets/icons/app.icon/Facebook.png'),
  Mail: require('@/assets/icons/app.icon/Mail.png'),
  Kwai: require('@/assets/icons/app.icon/Kwai.png'),
  Notes: require('@/assets/icons/app.icon/Notes.png'),
  Photos: require('@/assets/icons/app.icon/Photos.png'),
  QQ: require('@/assets/icons/app.icon/QQ.png'),
  Safari: require('@/assets/icons/app.icon/Safari.png'),
  TikTok: require('@/assets/icons/app.icon/TikTok.png'),
  Twitter: require('@/assets/icons/app.icon/Twitter.png'),
  WeChat: require('@/assets/icons/app.icon/WeChat.png'),
};

const $imageStyle: ImageStyle = {
  resizeMode: 'cover',
};
