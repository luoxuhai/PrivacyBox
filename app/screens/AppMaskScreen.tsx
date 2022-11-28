import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

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
      if (appStateStore.inForeground || appLockStore.isAppLocked) {
        props.navigation.goBack();
      }
    }, [appStateStore.inForeground, appLockStore.isAppLocked]);

    return (
      <>
        <StatusBar hidden />
        <BlurView style={$blurView} blurType={blurType} blurAmount={70} />
      </>
    );
  },
);

const $blurView: ViewStyle = {
  flex: 1,
  backgroundColor: 'transparent',
};
