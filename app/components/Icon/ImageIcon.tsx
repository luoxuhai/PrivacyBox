import * as React from 'react';
import { Image, ImageStyle, StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

import IconAppIcon from '@/assets/icons/app-icon/private_space.svg';
import AppIconCalculator from '@/assets/icons/app-icon/calculator.svg';
import AppIconHousekeeper from '@/assets/icons/app-icon/housekeeper.svg';
import AppIconPasswordBox from '@/assets/icons/app-icon/password_box.svg';
import AppIconTodo from '@/assets/icons/app-icon/todo.svg';
import AppIconClock from '@/assets/icons/app-icon/clock.svg';

import { AppIcons } from '@/screens/AppearanceScreen/types';

export type ImageIconTypes = keyof typeof iconRegistry | keyof typeof iconSvgRegistry;

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
  style?: StyleProp<ImageStyle | ViewStyle>;
}

export function ImageIcon(props: IconProps) {
  const { icon, color, size, style } = props;
  const SvgComponent = iconSvgRegistry[icon] as React.FC<SvgProps>;

  return SvgComponent ? (
    <SvgComponent style={style} width={size} height={size} />
  ) : (
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
  Instagram: require('@/assets/icons/app-icon/Instagram.png'),
  Bilibili: require('@/assets/icons/app-icon/Bilibili.png'),
  Facebook: require('@/assets/icons/app-icon/Facebook.png'),
  Mail: require('@/assets/icons/app-icon/Mail.png'),
  Kwai: require('@/assets/icons/app-icon/Kwai.png'),
  Notes: require('@/assets/icons/app-icon/Notes.png'),
  Photos: require('@/assets/icons/app-icon/Photos.png'),
  QQ: require('@/assets/icons/app-icon/QQ.png'),
  Safari: require('@/assets/icons/app-icon/Safari.png'),
  TikTok: require('@/assets/icons/app-icon/TikTok.png'),
  Twitter: require('@/assets/icons/app-icon/Twitter.png'),
  WeChat: require('@/assets/icons/app-icon/WeChat.png'),
};

export const iconSvgRegistry = {
  [AppIcons.Default]: IconAppIcon,
  [AppIcons.Calculator]: AppIconCalculator,
  [AppIcons.Clock]: AppIconClock,
  [AppIcons.Housekeeper]: AppIconHousekeeper,
  [AppIcons.PasswordBox]: AppIconPasswordBox,
  [AppIcons.Todo]: AppIconTodo,
};

const $imageStyle: ImageStyle = {
  resizeMode: 'cover',
};
