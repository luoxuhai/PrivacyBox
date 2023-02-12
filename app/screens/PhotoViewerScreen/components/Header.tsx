import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';

import { BOTTOM_TABS_HEIGHT } from '@/constants';
import { BackButton } from './BackButton';
import { BackupButton } from './BackupButton';
import { HeaderPhotoDetail } from './HeaderPhotoDetail';
import { useTheme } from '@/theme';

interface HeaderProps {
  visible: boolean;
  name: string;
  ctime: number;
  onBack: () => void;
}

export const Header = observer((props: HeaderProps) => {
  const { colors } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[
        $container,
        {
          paddingTop: safeAreaInsets.top,
          backgroundColor: colors.background,
          height: BOTTOM_TABS_HEIGHT + 8,
          display: props.visible ? 'flex' : 'none',
        },
      ]}
    >
      <BackButton onPress={props.onBack} />
      <HeaderPhotoDetail name={props.name} ctime={props.ctime} />
      <BackupButton />
    </View>
  );
});

const $container: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: BOTTOM_TABS_HEIGHT,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 9,
  opacity: 0.92,
  paddingHorizontal: 5,
};

// const $blurView: ViewStyle = {
//   ...StyleSheet.absoluteFillObject,
// };
