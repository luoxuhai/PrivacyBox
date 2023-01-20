import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { FullWindowOverlay } from 'react-native-screens';

import { AppStackParamList } from '@/navigators';
import { BlurView } from '@/components';
import { useTheme } from '@/theme';
import { useStores } from '@/models';
import { useUpdateEffect } from '@/utils';

export const AppMaskScreen: FC<StackScreenProps<AppStackParamList, 'AppMask'>> = observer(
  function AppMaskScreen(props) {
    const { isDark } = useTheme();
    const { appStateStore, appLockStore } = useStores();
    const blurType = isDark ? 'materialDark' : 'materialLight';

    useUpdateEffect(() => {
      if (appStateStore.inForeground || appLockStore.isLocked) {
        props.navigation.goBack();
      }
    }, [appStateStore.inForeground, appLockStore.isLocked]);

    return (
      <FullWindowOverlay style={{ flex: 1 }}>
        <BlurView style={$blurView} blurType={blurType} />
      </FullWindowOverlay>
    );
  },
);

const $blurView: ViewStyle = {
  flex: 1,
  backgroundColor: 'transparent',
};
