import React, { FC, useMemo, useRef, useState } from 'react';
import { ViewStyle, View, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';

import { AppStackParamList } from '@/navigators';
import { Button, Screen, Text, LottieView, SafeAreaScrollView } from '@/components';
import { radius, spacing, useTheme } from '@/theme';
import { useDimensions } from '@react-native-community/hooks';
import { useSafeAreaDimensions } from '@/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const DataMigratorScreen: FC<StackScreenProps<AppStackParamList, 'DataMigrator'>> = observer(
  () => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const safeAreaInsets = useSafeAreaInsets();
    const progressRef = useRef<ProgressRef>(null);

    return (
      <Screen
        style={{
          paddingHorizontal: safeAreaInsets.left,
        }}
      >
        <ScrollView
          contentContainerStyle={[
            $safeAreaScrollView,
            {
              flex: 1,
            },
          ]}
        >
          <Text text="正在迁移数据" />
          <Text text="请勿关闭本页面" />

          <CircularProgress
            ref={progressRef}
            value={80}
            radius={120}
            activeStrokeWidth={20}
            inActiveStrokeWidth={20}
            progressValueColor={colors.label}
            duration={10000}
            strokeColorConfig={[
              { color: colors.palette.yellow, value: 0 },
              { color: colors.palette.green, value: 100 },
            ]}
          />
        </ScrollView>
      </Screen>
    );
  },
);

const $safeAreaScrollView: ViewStyle = {
  padding: spacing[5],
  alignItems: 'center',
  justifyContent: 'center',
};
