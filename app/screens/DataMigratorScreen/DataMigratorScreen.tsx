import React, { FC, useEffect, useRef, useState } from 'react';
import { ViewStyle, View, ScrollView, TextStyle, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import CircularProgress, { ProgressRef } from 'react-native-circular-progress-indicator';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDeviceOrientation } from '@react-native-community/hooks';

import { AppStackParamList } from '@/navigators';
import { Screen, Text, ExitButton } from '@/components';
import { spacing, typography, useTheme } from '@/theme';
import { DataBaseV1 } from '@/database/v1';
import { useStores } from '@/models';
import { addFiles, addPhotos, createAlbum, createFolder } from '@/services/local';
import { reportException, useUpdateEffect } from '@/utils';
import { getSourceDir, getSourceUri } from './helpers/getSourcePath';
import { unlink } from 'react-native-fs';
import { t } from '@/i18n';
import { exportFailData } from './helpers/exportFailData';
import { File, FileRepository, FileType } from '@/database/v1/entities/file';
import { clearOldData } from './helpers/clearOldData';

export const DataMigratorScreen: FC<StackScreenProps<AppStackParamList, 'DataMigrator'>> = observer(
  (props) => {
    const { colors } = useTheme();
    const safeAreaInsets = useSafeAreaInsets();
    const progressRef = useRef<ProgressRef>(null);
    const headerHeight = useHeaderHeight();
    const { portrait } = useDeviceOrientation();
    const { appLockStore, globalStore } = useStores();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      DataBaseV1.init()
        .then(async () => {
          // 恢复密码
          const users = await DataBaseV1.queryAllUsers();

          if (users.admin?.password?.length === 6 && !appLockStore.passcode) {
            appLockStore.setPasscode(users.admin.password);
          } else if (users.ghost?.password?.length === 6 && !appLockStore.fakePasscode) {
            appLockStore.setFakePasscode(users.ghost.password);
          }

          const idMapFake = {
            [users.admin.id]: false,
            [users.ghost.id]: true,
          };

          const items = await DataBaseV1.queryFiles();

          const folders = items.filter(
            (item) => item.repository === FileRepository.File && item.type === FileType.Folder,
          );
          const files = items.filter(
            (item) => item.repository === FileRepository.File && item.type === FileType.File,
          );

          const albums = items.filter(
            (item) => item.repository === FileRepository.Album && item.type === FileType.Folder,
          );
          const photos = items.filter(
            (item) => item.repository === FileRepository.Album && item.type === FileType.File,
          );

          // 恢复文件夹
          if (folders.length) {
            for (const folder of folders) {
              await createFolder({
                id: folder.id,
                name: folder.name,
                parent_id: folder.parent_id || null,
                is_fake: idMapFake[folder.owner],
              });
              DataBaseV1.delete(folder.id);
            }
          }

          // 恢复相册
          if (albums.length) {
            for (const album of albums) {
              await createAlbum({
                id: album.id,
                name: album.name,
                is_fake: idMapFake[album.owner],
              });
              DataBaseV1.delete(album.id);
            }
          }

          const failFiles: File[] = [];
          if (files.length) {
            for (const file of files) {
              try {
                const sourceDir = getSourceDir(file.extra.source_id);
                const uri = getSourceUri(file.extra.source_id);

                await addFiles({
                  parent_id: file.parent_id,
                  is_fake: idMapFake[file.owner],
                  files: [
                    {
                      name: file.name,
                      uri,
                      size: file.size,
                      mime: file.mime,
                    },
                  ],
                });

                DataBaseV1.delete(file.id);
                unlink(sourceDir);
              } catch (error) {
                failFiles.push(file);
              }
            }
          }

          const failPhotos: File[] = [];
          if (photos.length) {
            for (const photo of photos) {
              try {
                const sourceDir = getSourceDir(photo.extra.source_id);
                const uri = getSourceUri(photo.extra.source_id);

                await addPhotos({
                  album_id: photo.parent_id,
                  is_fake: idMapFake[photo.owner],
                  photos: [
                    {
                      name: photo.name,
                      uri,
                      mime: photo.mime,
                      size: photo.size,
                      ctime: photo.ctime,
                      mtime: photo.mtime,
                      width: photo.extra.width,
                      height: photo.extra.height,
                      duration: photo.extra.duration,
                    },
                  ],
                });

                DataBaseV1.delete(photo.id);
                unlink(sourceDir);
              } catch (error) {
                failPhotos.push(photo);
              }
            }
          }

          if (failFiles.length || failPhotos.length) {
            const uris = [...failFiles, ...failPhotos].map((item) =>
              getSourceUri(item.extra.source_id),
            );

            globalStore.setMigrationFailed(uris);
            handleExportFailData(uris);
            reportException({
              message: '有迁移失败的数据',
              extra: {
                failFiles,
                failPhotos,
              },
            });
          } else {
            DataBaseV1.close(() => {
              clearOldData();
            });
            setProgress(100);
          }
        })
        .catch((error) => {
          props.navigation.goBack();
          reportException({ error, message: '初始化旧数据库失败' });
        });
    }, []);

    useUpdateEffect(() => {
      if (progress === 100) {
        setTimeout(() => {
          props.navigation.goBack();
        }, 1000);
      }
    }, [progress, props.navigation]);

    function handleExportFailData(uris: string[]) {
      Alert.alert(t('dataMigratorScreen.someFailTitle'), t('dataMigratorScreen.someFailMsg'), [
        {
          text: t('common.cancel'),
          style: 'cancel',
          onPress() {
            props.navigation.goBack();
          },
        },
        {
          text: t('dataMigratorScreen.export'),
          style: 'default',
          onPress() {
            exportFailData(uris);
          },
        },
      ]);
    }

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
            <Text style={$title} color={colors.label} tk="dataMigratorScreen.doing" />
            <Text style={$subtitle} color={colors.secondaryLabel} tk="dataMigratorScreen.tip" />
          </View>

          <CircularProgress
            ref={progressRef}
            value={progress || 99}
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
