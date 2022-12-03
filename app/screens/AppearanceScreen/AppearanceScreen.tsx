import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  View,
  TextStyle,
  ImageStyle,
  LayoutRectangle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { StackScreenProps } from '@react-navigation/stack';
import { Check as IconCheck } from 'iconoir-react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { SettingStackParamList } from '@/navigators';
import {
  Screen,
  ListSection,
  ListCell,
  SafeAreaScrollView,
  ImageIcon,
  Text,
  ImageIconTypes,
} from '@/components';
import { radius, spacing, typography, useTheme } from '@/theme';
import { appearanceToMode } from '@/models/ThemeStore';
import { TextKeyPath } from '@/i18n';
import { ICON_CHECK_SIZE } from '@/constant';
import { appIconOptions } from './constant';
import { HapticFeedback } from '@/utils';

export const AppearanceScreen: FC<StackScreenProps<SettingStackParamList, 'Appearance'>> = observer(
  () => {
    const bottomTabBarHeight = useBottomTabBarHeight();

    return (
      <Screen>
        <SafeAreaScrollView
          contentContainerStyle={[
            $contentContainer,
            {
              paddingBottom: bottomTabBarHeight,
            },
          ]}
        >
          <AppearanceColorSection />
          <AppIconSection />
        </SafeAreaScrollView>
      </Screen>
    );
  },
);

const AppearanceColorSection = observer(() => {
  const { appearance, isSystemAppearance, colors, setAppearanceMode } = useTheme();

  const list: { mode: AppearanceMode; label: TextKeyPath }[] = [
    {
      label: 'appearanceScreen.appearanceColor.auto',
      mode: 'auto',
    },
    {
      label: 'appearanceScreen.appearanceColor.light',
      mode: 'light',
    },
    {
      label: 'appearanceScreen.appearanceColor.dark',
      mode: 'dark',
    },
  ];

  return (
    <ListSection titleTk="appearanceScreen.appearanceColor.title">
      {list.map((item, idx) => {
        const isSelected = item.mode === appearanceToMode(appearance, isSystemAppearance);
        const bottomSeparator = idx < list.length - 1;

        return (
          <ListCell
            key={item.mode}
            tk={item.label}
            bottomSeparator={bottomSeparator}
            rightIcon={
              isSelected ? (
                <IconCheck
                  width={ICON_CHECK_SIZE}
                  height={ICON_CHECK_SIZE}
                  color={colors.palette.primary6}
                  strokeWidth={2.5}
                />
              ) : null
            }
            onPress={() => {
              setAppearanceMode(item.mode);
              HapticFeedback.selection();
            }}
          />
        );
      })}
    </ListSection>
  );
});

const APP_ICON_ITEM_SIZE = 58;
const APP_ICON_LIST_PADDING = spacing[5];
const APP_ICON_ITEM_RADIUS = radius[5];

const AppIconSection = observer(() => {
  const { appIcon, setAppIcon } = useTheme();
  const [layout, setLayout] = useState<LayoutRectangle>();

  const marginHorizontal = useMemo(() => {
    const listRealWidth = layout?.width - APP_ICON_LIST_PADDING * 2;
    const rowCount = Math.trunc(listRealWidth / APP_ICON_ITEM_SIZE - 1);
    const extraCount = Math.trunc((rowCount - appIconOptions.length) / 2 || 0);
    const rowRealCount = rowCount > appIconOptions.length ? rowCount - extraCount : rowCount;
    return (listRealWidth / rowRealCount - APP_ICON_ITEM_SIZE) / 2 || 0;
  }, [layout?.width]);

  return (
    <ListSection titleTk="appearanceScreen.appIcon.title">
      <ListCell
        style={$appIconOptionContainer}
        bottomSeparator={false}
        onLayout={(e) => {
          setLayout(e.nativeEvent.layout);
        }}
      >
        {appIconOptions.map((option) => {
          return (
            <AppIconOption
              key={option.title}
              style={{
                marginHorizontal,
              }}
              icon={option.name}
              title={option.title}
              checked={appIcon === option.name}
              onPress={() => {
                setAppIcon(option.name);
                HapticFeedback.selection();
              }}
            />
          );
        })}
      </ListCell>
    </ListSection>
  );
});

interface AppIconOptionProps {
  title: TextKeyPath;
  icon: ImageIconTypes;
  checked: boolean;
  style?: StyleProp<ViewStyle>;
  onPress(): void;
}

const AppIconOption = observer<AppIconOptionProps>((props) => {
  const { colors } = useTheme();
  const { checked } = props;
  const scale = useSharedValue(1);

  const $appIconWrapperCheckedStyle: ViewStyle = {
    borderWidth: 2.5,
    borderColor: colors.palette.primary6,
  };

  const $animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(scale.value, {
          mass: 0.1,
        }),
      },
    ],
  }));

  useEffect(() => {
    scale.value = checked ? 0.9 : 1;
  }, [checked]);

  return (
    <TouchableOpacity
      style={[$appIconOption, props.style]}
      activeOpacity={0.8}
      onPress={props.onPress}
    >
      <View
        style={[
          $appIconWrapper,
          {
            borderColor: colors.quaternaryLabel,
          },
          checked && $appIconWrapperCheckedStyle,
        ]}
      >
        <Animated.View
          style={[
            $animatedStyle,
            {
              width: '100%',
              aspectRatio: 1,
            },
          ]}
        >
          <ImageIcon style={$appIcon} icon={props.icon} />
        </Animated.View>
      </View>
      <Text
        style={$appIconName}
        tk={props.title}
        color={checked ? colors.palette.primary6 : colors.label}
      />
    </TouchableOpacity>
  );
});

const $contentContainer: ViewStyle = {
  paddingTop: spacing[5],
  paddingHorizontal: spacing[5],
};

const $appIconOptionContainer: ViewStyle = {
  flexWrap: 'wrap',
  padding: APP_ICON_LIST_PADDING,
};

const $appIconOption: ViewStyle = {
  alignItems: 'center',
  marginVertical: spacing[3],
};

const $appIconWrapper: ViewStyle = {
  width: APP_ICON_ITEM_SIZE,
  aspectRatio: 1,
  borderRadius: APP_ICON_ITEM_RADIUS + 2,
  overflow: 'hidden',
  borderWidth: StyleSheet.hairlineWidth,
};

const $appIconName: TextStyle = {
  ...typography.caption1,
  marginTop: spacing[3],
};

const $appIcon: ImageStyle = {
  borderRadius: APP_ICON_ITEM_RADIUS,
  overflow: 'hidden',
};
