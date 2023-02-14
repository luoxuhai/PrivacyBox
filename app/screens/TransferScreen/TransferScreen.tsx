import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Share, Alert, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import QRCode from 'react-native-qrcode-svg';
import * as KeepAwake from 'expo-keep-awake';
import debounce from 'lodash/debounce';
import FS from 'react-native-fs';
import NetInfo, { NetInfoStateType, NetInfoSubscription } from '@react-native-community/netinfo';
import { HttpServer } from '@react-native-library/webserver';
import { StackScreenProps } from '@react-navigation/stack';
import { SFSymbol } from 'react-native-sfsymbols';

import { PhotoTypes, Status } from '@/database/entities/types';
import { getAvailableThumbnail, SafeAreaScrollView, Screen } from '@/components';
import WebClient from './helpers/WebClient';
import {
  HapticFeedback,
  Overlay,
  randomNumRange,
  Device,
  LocalPathManager,
  reportException,
  generateUUID,
} from '@/utils';
import { MoreFeatureNavigatorParamList } from '@/navigators';
import { useTheme } from '@/theme';
import { extname, join } from '@/lib/path';
import { t } from '@/i18n';
import { addPhotos, fetchAlbums, fetchPhotos } from '@/services/local';
import { useStores } from '@/models';
import { getPhotoTypeByMime } from '@/utils/getFileTypeByMime';
import { IResult, transformPhotoFromUri } from '../PhotosScreen/helpers/PhotoImporter';

let unsubscribeNetInfo: NetInfoSubscription | null;

/** 连接状态 */
const enum ConnectState {
  Pending = 1,
  Failed,
  Successful,
}

export const TransferScreen = observer<StackScreenProps<MoreFeatureNavigatorParamList, 'Transfer'>>(
  (props) => {
    const [url, setUrl] = useState<string | undefined>();
    const [connectState, setConnectState] = useState<ConnectState>(ConnectState.Pending);
    const { colors } = useTheme();
    const {
      appLockStore: { inFakeEnvironment },
    } = useStores();

    useEffect(() => {
      WebClient.update(true);
      KeepAwake.activateKeepAwake();

      subscribeNetInfo();
      return () => {
        stopHttpServer();
        unsubscribeNetInfo?.();
        unsubscribeNetInfo = null;
        KeepAwake.deactivateKeepAwake();
      };
    }, []);

    function subscribeNetInfo() {
      if (unsubscribeNetInfo) return;

      unsubscribeNetInfo = NetInfo.addEventListener(
        debounce(
          (state) => {
            if (state.type === NetInfoStateType.wifi) {
              if (!HttpServer.isRunning) {
                // 尝试两次
                startHttpServer().catch(() => {
                  startHttpServer().catch(() => {
                    Alert.alert(t('transferScreen.connectFail'), undefined, [
                      {
                        text: t('common.confirm'),
                      },
                    ]);
                    props.navigation.goBack();
                  });
                });
              }
            } else {
              setConnectState(ConnectState.Failed);
              Overlay.toast({
                preset: 'error',
                title: t('transferScreen.wifiTip'),
              });
            }
          },
          1000,
          {
            leading: true,
            trailing: false,
          },
        ),
      );
    }

    useEffect(() => {
      if (connectState === ConnectState.Failed) {
        setUrl(undefined);
        HapticFeedback.notification.error();
      }
    }, [connectState]);

    async function startHttpServer() {
      await stopHttpServer();
      const ip = await Device.getIpAddress();
      const port = randomNumRange(5000, 60000);
      const origin = `http://${ip}:${port}`;

      await HttpServer.start(port, 'http_service', async (request, response) => {
        if (request.method === 'OPTIONS') {
          response.send(200);
        }
        // 获取网站
        else if (request.method === 'GET' && !request.url.startsWith('/api/')) {
          let filePath = join(WebClient.path, request.url);
          if (request.url === '/') {
            filePath = join(WebClient.path, 'index.html');
          }

          if (await FS.exists(filePath)) {
            response.sendFile(filePath);
            return;
          }
          response.send(404);
        }
        // 获取相册
        else if (request.method === 'GET' && request.url === '/api/albums') {
          try {
            const items = await fetchAlbums({
              status: Status.Normal,
              is_fake: inFakeEnvironment,
            });
            response.send(
              200,
              'application/json',
              JSON.stringify({
                code: 0,
                data: {
                  list: items.map((item) => {
                    item.cover = transformRemoteUri(origin, item.cover);
                    return item;
                  }),
                  total: items.length,
                },
              }),
            );
          } catch (error) {
            reportException({ error });
            response.send(500);
          }
          // 获取文件
        } else if (request.method === 'GET' && request.url.startsWith('/api/photos')) {
          try {
            const items = await fetchPhotos({
              parent_id: request.query.parent_id as string,
              status: Status.Normal,
              is_fake: inFakeEnvironment,
            });

            for (const [idx, item] of items.entries()) {
              const availableThumbnail = await getAvailableThumbnail({
                thumbnail: item.thumbnail,
                poster: item.poster,
              });
              if (availableThumbnail) {
                item.thumbnail = availableThumbnail;
              } else {
                item.thumbnail = item.type === PhotoTypes.Photo ? item.uri : '';
              }

              item.poster = item.thumbnail ? item.poster : '';

              const _item = {
                ...item,
                source: transformRemoteUri(origin, item.uri),
                thumbnail: transformRemoteUri(origin, item.thumbnail),
                poster: transformRemoteUri(origin, item.poster),
              };

              delete _item.uri;
              delete _item.extra;

              items[idx] = _item;
            }

            response.send(
              200,
              'application/json',
              JSON.stringify({
                code: 0,
                data: {
                  list: items,
                  total: items.length,
                },
              }),
            );
          } catch (error) {
            reportException({ error });
            response.send(500);
          }
          // 上传文件
        } else if (request.method === 'POST' && request.url.startsWith('/api/photos/upload')) {
          const { file, query } = request;
          if (!file?.path) {
            response.send(400);
            return;
          }

          try {
            const tempPath = join(
              LocalPathManager.tempPath,
              generateUUID() + extname(file.filename),
            );
            await FS.moveFile(file.path, tempPath);
            const type = getPhotoTypeByMime(file.mimeType);

            const info = (await transformPhotoFromUri(
              tempPath,
              type === PhotoTypes.Video,
              true,
            )) as IResult;

            const results = await addPhotos({
              album_id: query.album_id,
              is_fake: inFakeEnvironment,
              photos: [
                {
                  uri: tempPath,
                  name: file.filename,
                  mime: file.mimeType,
                  ...info,
                },
              ],
            });

            if (results.length > 0) {
              response.send(200);
            } else {
              reportException({ message: '添加传输的文件出错' });
            }
          } catch (error) {
            response.send(500);
          }
          // 下载文件
        } else if (request.method === 'GET' && request.url.startsWith('/api/file/')) {
          response.sendFile(request.url.replace('/api/file', LocalPathManager.basePath));
        } else {
          response.send(404);
        }
      });

      setUrl(origin);
      setConnectState(ConnectState.Successful);
    }

    async function stopHttpServer() {
      return await HttpServer.stop();
    }

    const handleShareUrl = useCallback(() => {
      if (url) {
        Share.share({
          url,
        });
      }
    }, [url]);

    return (
      <Screen>
        <SafeAreaScrollView style={styles.container} contentContainerStyle={styles.content}>
          <View style={styles.wifiContainer}>
            {connectState !== ConnectState.Failed ? (
              <SFSymbol
                style={styles.wifi}
                name="wifi"
                color={
                  connectState === ConnectState.Pending
                    ? colors.palette.gray2
                    : colors.palette.green
                }
              />
            ) : (
              <SFSymbol style={styles.wifi} name="wifi.slash" color={colors.palette.red} />
            )}
            {connectState === ConnectState.Failed && (
              <Text
                style={[
                  styles.errorTip,
                  {
                    color: colors.palette.red,
                  },
                ]}
              >
                {t('transferScreen.errorTip')}
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.tip,
              {
                color: colors.secondaryLabel,
              },
            ]}
          >
            {t('transferScreen.tip1')}
            <Text
              style={[
                styles.tipBold,
                {
                  color: colors.label,
                },
              ]}
            >
              {t('transferScreen.tip2')}
            </Text>
          </Text>
          <View
            style={[
              styles.urlContainer,
              {
                backgroundColor: colors.tertiaryFill,
              },
            ]}
          >
            <Text
              style={[
                styles.url,
                {
                  color: colors.palette.primary6,
                },
              ]}
              selectable
            >
              {url}
            </Text>
            <TouchableOpacity onPress={handleShareUrl}>
              <SFSymbol
                style={{
                  width: 24,
                  height: 24,
                }}
                name="square.and.arrow.up"
                color={colors.palette.primary6}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.QRCodeContainer,
              {
                borderColor: colors.quaternaryLabel,
              },
            ]}
          >
            {url && <QRCode size={180} value={url} />}
          </View>
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

const styles = StyleSheet.create({
  QRCodeContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  errorTip: {
    marginTop: 10,
  },
  tip: {
    lineHeight: 20,
    marginBottom: 20,
    marginTop: 70,
    paddingHorizontal: 8,
    width: 310,
  },
  tipBold: {
    fontWeight: 'bold',
  },
  url: {
    fontSize: 18,
    fontWeight: '500',
  },
  urlContainer: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    marginBottom: 80,
    paddingHorizontal: 10,
    width: 310,
  },
  wifi: {
    height: 60,
    overflow: 'hidden',
    width: 60,
  },
  wifiContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
  },
});

function transformRemoteUri(origin: string, uri: string) {
  return uri?.replace(LocalPathManager.basePath, `${origin}/api/file`);
}
