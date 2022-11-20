import React from 'react';
import { Settings, AppNotification, Safari, Folder, MediaImageList } from 'iconoir-react-native';
import { SvgProps } from 'react-native-svg';

const IconMap = {
  Settings,
  More: AppNotification,
  Browser: Safari,
  Files: Folder,
  Album: MediaImageList,
};

interface BottomTabIconProps extends SvgProps {
  icon: 'Settings' | 'More' | 'Browser' | 'Files' | 'Album';
}

const SIZE = 26;

export function BottomTabIcon({ icon, ...rest }: BottomTabIconProps) {
  const Icon = IconMap[icon];

  return <Icon width={SIZE} height={SIZE} strokeWidth={2} {...rest} />;
}
