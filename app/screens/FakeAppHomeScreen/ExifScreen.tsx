import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Image, ViewStyle, View, TextStyle, ImageStyle, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackParamList } from '@/navigators';
import { Screen, Button, Text } from '@/components';
import { FakePageKeys } from './constants';
import { radius, spacing, typography, useTheme } from '@/theme';
import { openPhotosPicker } from './helpers/ImageImporter';
import { getImageExif } from './helpers/getImageExif';
import { Overlay, useAsyncMemo } from '@/utils';
import { t } from '@/i18n';

export interface ExifScreenParams {
  title: string;
  key: FakePageKeys;
}

export const ExifScreen: FC<NativeStackScreenProps<AppStackParamList, 'Exif'>> = observer(
  (props) => {
    const { key, title } = props.route.params;
    const [imageUri, setImageUri] = useState<string>();
    const [imageId, setImageId] = useState<string>();
    const { colors } = useTheme();

    useEffect(() => {
      props.navigation.setOptions({
        title,
      });
    }, [title]);

    async function handleImportImage() {
      const res = await openPhotosPicker();
      if (res) {
        setImageUri(res.uri);
        setImageId(res.id);
      }
    }

    const imageExif = useAsyncMemo(async () => {
      const value = imageId ? await getImageExif(imageId) : null;
      return JSON.stringify(value, null, 2);
    }, [imageId]);

    return (
      <Screen
        style={[
          $screen,
          key === FakePageKeys.ExifEditor && {
            justifyContent: 'center',
          },
        ]}
      >
        <Image
          style={[
            $image,
            {
              backgroundColor: imageUri ? undefined : colors.quaternaryFill,
            },
            key === FakePageKeys.ExifEditor && {
              marginTop: 0,
            },
          ]}
          source={{ uri: imageUri }}
          resizeMode="contain"
        />

        <View style={$buttons}>
          <Button style={$buttonLeft} tk="exifScreen.import" onPress={handleImportImage} />
          {key === FakePageKeys.ExifEditor && (
            <Button
              disabled={!imageUri}
              tk="exifScreen.save"
              onPress={() => {
                Overlay.toast({
                  preset: 'done',
                  title: t('exifScreen.removeExtra'),
                });
              }}
            />
          )}
        </View>

        {key === FakePageKeys.ExifViewer && (
          <View style={$exifContainer}>
            <Text style={$exifTitle} tk="exifScreen.exif" />
            <ScrollView contentContainerStyle={{ padding: 20 }}>
              {imageExif !== 'null' && <Text selectable>{imageExif}</Text>}
            </ScrollView>
          </View>
        )}
      </Screen>
    );
  },
);

const $screen: ImageStyle = {
  alignItems: 'center',
};

const $image: ImageStyle = {
  width: 200,
  height: 300,
  flexShrink: 0,
  marginTop: spacing[13],
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

const $exifContainer: ViewStyle = {
  flex: 1,
  width: '100%',
  marginTop: spacing[5],
};

const $exifTitle: TextStyle = {
  ...typography.headline,
  padding: spacing[5],
};
