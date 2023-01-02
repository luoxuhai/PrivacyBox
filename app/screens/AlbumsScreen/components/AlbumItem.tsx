import React from 'react';
import {
  Text,
  View,
  ViewStyle,
  Pressable,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { MoreVert } from 'iconoir-react-native';

import { BlurView } from '@/components';
import { radius, spacing, typography, useTheme } from '@/theme';
import { FetchAlbumsResult } from '@/services/local';

interface AlbumItemProps {
  item: FetchAlbumsResult;
  onPress: (item: FetchAlbumsResult) => void;
  onOpenEditor: (item: FetchAlbumsResult) => void;
}

const ImageNoImages = require('@/assets/images/no-images.png');

export const AlbumItem = observer<AlbumItemProps>((props) => {
  const { cover, name, item_count } = props.item;
  const { isDark, colors } = useTheme();

  const textColor = colors.label;
  const imageSource = cover ? { uri: cover } : ImageNoImages;

  return (
    <TouchableOpacity
      style={[
        $container,
        {
          borderColor: colors.palette.gray6,
        },
      ]}
      activeOpacity={0.8}
      onPress={() => props.onPress(props.item)}
    >
      <FastImage
        style={[
          $image,
          {
            backgroundColor: colors.secondaryFill,
          },
        ]}
        source={imageSource}
        resizeMode="cover"
      />

      <View style={$bottomContainer}>
        <BlurView
          style={$blurView}
          blurType={isDark ? 'materialDark' : 'materialLight'}
          blurAmount={10}
        />
        <View style={$textContainer}>
          <Text style={[$titleText, { color: textColor }]} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[$countText, { color: textColor }]} numberOfLines={1}>
            {item_count ?? 0}
          </Text>
        </View>
        <Pressable style={$configIcon} onPress={() => props.onOpenEditor(props.item)}>
          <MoreVert width={25} height={30} strokeWidth={2} color={textColor} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
});

const $container: ViewStyle = {
  minWidth: 150,
  height: 200,
  borderRadius: radius[8],
  overflow: 'hidden',
  borderWidth: StyleSheet.hairlineWidth,
};

const $image: ImageStyle = {
  flex: 1,
};

const $bottomContainer: ViewStyle = {
  height: 60,
  padding: spacing[4],
  paddingRight: spacing[1],
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const $textContainer: ViewStyle = {
  width: 110,
  height: '100%',
  justifyContent: 'space-between',
};

const $blurView: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  borderRadius: radius[6],
};

const $configIcon: ViewStyle = {};

const $titleText: TextStyle = {
  ...typography.subhead,
  fontWeight: '500',
};

const $countText: TextStyle = {
  ...typography.footnote,
  fontWeight: '500',
};
