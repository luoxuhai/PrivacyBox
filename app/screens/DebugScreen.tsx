import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DevSettings, ViewStyle, Text, View, TextStyle } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { SettingStackParamList } from '@/navigators';
import { Screen, ExitButton, SafeAreaScrollView, ListSection, ListCell } from '@/components';
import { spacing, useTheme } from '@/theme';
import { AppDataSource } from '@/database';
import { storage } from '@/utils/storage';
import { rootStore } from '@/models';
import { LocalPathManager, DynamicUpdate } from '@/utils';
import { ICloud } from '@/services/icloud/icloud';
import Photo from '@/database/entities/photo';
import File from '@/database/entities/file';
import { unlink } from 'react-native-fs';

if (__DEV__) {
  DevSettings.addMenuItem('Clear Storage', () => {
    storage.clear();
    DevSettings.reload();
  });

  DevSettings.addMenuItem('Clear Photo DB', async () => {
    await AppDataSource.manager.clear(Photo);
    await unlink(LocalPathManager.photoPath);
    DevSettings.reload();
  });

  DevSettings.addMenuItem('Clear File DB', async () => {
    await AppDataSource.manager.clear(File);
    await unlink(LocalPathManager.filePath);
    DevSettings.reload();
  });
}

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
            <ListCell
              textStyle={{
                color: colors.palette.blue,
              }}
              text="检测更新"
              rightIcon={null}
              onPress={() => {
                DynamicUpdate.sync(true);
              }}
            />
          </ListSection>
          <ListSection>
            <ListCell style={{ padding: spacing[5] }}>
              <View>
                <Text style={$text} selectable>
                  basePath:
                  {LocalPathManager.basePath}
                </Text>
                <Text style={$text} selectable>
                  photoPath:
                  {LocalPathManager.photoPath}
                </Text>
                <Text style={$text} selectable>
                  dbPath:
                  {LocalPathManager.dbPath}
                </Text>
                <Text selectable>
                  iCloud container path:
                  {ICloud.iCloudBasePath}
                </Text>
              </View>
            </ListCell>
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

const $text: TextStyle = {
  marginBottom: spacing[5],
};
