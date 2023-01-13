import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { ViewStyle, View, ScrollView, TextStyle, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import { useHeaderHeight } from '@react-navigation/elements';

import { AppStackParamList } from '@/navigators';
import { Screen, Text, ExitButton } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { DataBaseV1 } from '@/database/v1';
import { useStores } from '@/models';

export const DataMigratorScreen: FC<StackScreenProps<AppStackParamList, 'DataMigrator'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const safeAreaInsets = useSafeAreaInsets();
    const progressRef = useRef<ProgressRef>(null);
    const headerHeight = useHeaderHeight();
    const { portrait } = useDeviceOrientation();
    const { appLockStore } = useStores();

    useEffect(() => {
      DataBaseV1.init()
        .then(async () => {
          // 恢复密码
          const passcodes = await DataBaseV1.queryAllPassword();
          if (passcodes.admin && !appLockStore.passcode) {
            appLockStore.setPasscode(passcodes.admin);
          } else if (passcodes.ghost && !appLockStore.fakePasscode) {
            appLockStore.setFakePasscode(passcodes.ghost);
          }

          const items = await DataBaseV1.queryFiles();

          const folders = items.filter(item => item.type)
          const files = items.filter(item => item.type)

          const albums = items.filter(item => item.type)
          const photos = items.filter(item => item.type)

          if (folders.length) {
            
          }

          if (files.length) {
          }

          if (albums.length) {
          }

          if (photos.length) {
          }
        })
        .catch(() => {
          Alert.alert('x');
        });
    }, []);

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => (
          <ExitButton
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        ),
      });
    }, []);

    return (
      <Screen
        style={{
          paddingLeft: safeAreaInsets.left,
          paddingRight: safeAreaInsets.right,
          marginTop: -headerHeight * 2,
        }}
      >
        <ScrollView
          contentContainerStyle={[
            $safeAreaScrollView,
            {
              flex: 1,
              flexDirection: portrait ? 'column' : 'row',
            },
          ]}
        >
          <View
            style={[
              $textContainer,
              !portrait && {
                marginBottom: 0,
                marginRight: spacing[12],
              },
            ]}
          >
            <Text style={$title} color={colors.label} text="正在迁移数据" />
            <Text style={$subtitle} color={colors.secondaryLabel} text="请勿关闭本页面" />
          </View>

          <CircularProgress
            ref={progressRef}
            value={80}
            radius={120}
            title="%"
            titleStyle={{
              marginTop: 0,
            }}
            activeStrokeWidth={20}
            inActiveStrokeWidth={20}
            progressValueColor={colors.label}
            duration={10000}
            inActiveStrokeColor={colors.fill}
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

const $title: TextStyle = {
  ...typography.title1,
  fontWeight: '500',
};

const $textContainer: ViewStyle = {
  alignItems: 'center',
  marginBottom: spacing[20],
};

const $subtitle: TextStyle = {
  ...typography.body,
  marginTop: spacing[6],
};
