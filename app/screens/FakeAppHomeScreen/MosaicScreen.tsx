import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Image, ViewStyle, View, ImageStyle } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { saveToLibraryAsync } from 'expo-media-library';

import { AppStackParamList } from '@/navigators';
import { Screen, Button } from '@/components';
import { FakePageKeys } from './constants';
import { radius, spacing, useTheme } from '@/theme';
import { request } from '@/lib/ImagePixellate';
import { openPhotosPicker } from './helpers/ImageImporter';
import { Overlay } from '@/utils';
import { t } from '@/i18n';

const keyToPixellate: { [key: string]: 'Face' | 'QRCode' | 'Text' } = {
  [FakePageKeys.Face]: 'Face',
  [FakePageKeys.QRCode]: 'QRCode',
  [FakePageKeys.Text]: 'Text',
};

export const MosaicScreen: FC<NativeStackScreenProps<AppStackParamList, 'Mosaic'>> = observer(
  (props) => {
    const { key, title } = props.route.params;
    const [imageUri, setImageUri] = useState<string>();
    const { colors } = useTheme();

    useEffect(() => {
      props.navigation.setOptions({
        title,
      });
    }, [title]);

    async function handleImportImage() {
      const res = await openPhotosPicker();
      Overlay.alert({ preset: 'spinner', duration: 0 });

      try {
        if (res) {
          const { destPath } = await request({
            path: res.uri.replace('file://', ''),
            type: keyToPixellate[key],
          });

          setImageUri(destPath);
        }
      } catch {}

      setTimeout(() => {
        Overlay.dismissAllAlerts();
      }, 500);
    }

    async function handleSaveToLibrary() {
      await saveToLibraryAsync(imageUri);
      Overlay.toast({
        preset: 'done',
        title: t('exifScreen.removeExtra'),
      });
    }

    return (
      <Screen style={$screen}>
        <Image
          style={[
            $image,
            {
              backgroundColor: imageUri ? undefined : colors.quaternaryFill,
            },
          ]}
          source={{ uri: imageUri }}
          resizeMode="contain"
        />

        <View style={$buttons}>
          <Button style={$buttonLeft} tk="exifScreen.import" onPress={handleImportImage} />
          <Button disabled={!imageUri} tk="exifScreen.save" onPress={handleSaveToLibrary} />
        </View>
      </Screen>
    );
  },
);

const $screen: ImageStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

const $image: ImageStyle = {
  width: 200,
  height: 360,
  flexShrink: 0,
  borderRadius: radius[5],
};

const $buttons: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: spacing[8],
};

const $buttonLeft: ViewStyle = {
  marginRight: spacing[5],
};
