import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DevSettings, ViewStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SettingStackParamList } from '@/navigators';

import { Screen, ExitButton, SafeAreaScrollView, ListSection, ListCell } from '@/components';
import { spacing, useTheme } from '@/theme';
import { storage } from '@/storage';
import { rootStore } from '@/models';

export const DebugScreen: FC<StackScreenProps<SettingStackParamList, 'Debug'>> = observer(
  function DebugScreen(props) {
    const { colors } = useTheme();

    useEffect(() => {
      props.navigation.setOptions({
        headerRight: () => <ExitButton onPress={props.navigation.goBack} />,
      });
    }, []);

    return (
      <Screen type="tabView" statusBarStyle="inverted">
        <SafeAreaScrollView contentContainerStyle={$contentContainer}>
          <ListSection>
            <ListCell
              textStyle={{
                color: colors.palette.blue,
              }}
              text="清理 storage"
              rightIcon={null}
              onPress={() => {
                storage.clear();
                DevSettings.reload();
              }}
            />
            <ListCell
              textStyle={{
                color: colors.palette.blue,
              }}
              text="清理购买状态"
              rightIcon={null}
              onPress={() => {
                rootStore.purchaseStore.clear();
              }}
            />
          </ListSection>
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

const $contentContainer: ViewStyle = {
  paddingHorizontal: spacing[6],
  paddingTop: spacing[5],
};
