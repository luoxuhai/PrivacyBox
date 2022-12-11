import React, { FC } from 'react';
import { Text, View, ViewStyle, StyleProp, Pressable, StyleSheet, TextStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { MoreVert } from 'iconoir-react-native';

import { BlurView } from '@/components';
import { radius, spacing, typography, useTheme } from '@/theme';

interface AlbumItemProps {
  item: any;
}
export const AlbumItem = observer<AlbumItemProps>((props) => {
  const { isDark, colors } = useTheme();

  const textColor = colors.label;
  return (
    <Pressable
      style={[
        $container,
        {
          borderColor: colors.palette.gray6,
        },
      ]}
    >
      <FastImage
        style={[
          $image,
          {
            backgroundColor: colors.secondaryFill,
          },
        ]}
        source={{ uri: props.item.src }}
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
            {props.item.name}
          </Text>
          <Text style={[$countText, { color: textColor }]} numberOfLines={1}>
            {props.item.count}
          </Text>
        </View>
        <Pressable style={$configIcon}>
          <MoreVert width={25} height={30} strokeWidth={2} color={textColor} />
        </Pressable>
      </View>
    </Pressable>
  );
});

const $container: ViewStyle = {
  width: 150,
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
  borderRadius: radius[7],
};

const $configIcon: ViewStyle = {};

const $titleText: TextStyle = {
  ...typography.callout,
  fontWeight: '500',
};

const $countText: TextStyle = {
  ...typography.footnote,
  fontWeight: '500',
};
