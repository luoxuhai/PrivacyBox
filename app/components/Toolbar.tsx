import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { SvgProps } from 'react-native-svg';
import { useDeviceOrientation } from '@react-native-community/hooks';
import { SFSymbol, SFSymbolProps } from 'react-native-sfsymbols';

import { Device } from '@/utils';
import { BOTTOM_TABS_HEIGHT } from '@/constants';
import { useTheme } from '@/theme';
import { BlurView } from '@/components';

export interface IToolbarItem {
  title: string;
  titleStyle?: TextStyle;
  key: string | number;
  icon?: React.FC<SvgProps> | SFSymbolProps['name'];
  iconProps?: SvgProps | SFSymbolProps;
  type?: 'button' | 'menu';
  PopoverMenu?: React.FC<{ disabled: boolean }>;
}

interface IToolbarProps extends ViewProps {
  visible: boolean;
  list: IToolbarItem[];
  disabled?: boolean;
  hideBorder?: boolean;
  onPress?: (key: string | number) => void;
}

export const Toolbar = observer<IToolbarProps>(
  ({ list, visible = false, disabled = false, hideBorder = false, ...rest }) => {
    const orientation = useDeviceOrientation();
    const { colors, isDark } = useTheme();

    const displayStyle: ViewStyle = {
      display: visible ? 'flex' : 'none',
    };

    const borderStyle: ViewStyle | undefined = hideBorder
      ? undefined
      : {
          borderColor: colors.separator,
          borderTopWidth: StyleSheet.hairlineWidth,
        };

    const paddingStyle = {
      paddingBottom: Device.isPad || orientation.landscape ? 20 : 28,
    };

    const ToolbarItem = useCallback(
      ({ item, style }: { item: IToolbarItem; style?: ViewStyle }) => {
        return (
          <TouchableOpacity
            disabled={disabled}
            style={[
              Device.isPad || orientation.landscape ? styles.itemRow : styles.item,
              {
                width: `${100 / list.length}%`,
              },
              style,
            ]}
            onPress={() => {
              rest.onPress?.(item.key);
            }}
          >
            {item.icon ? (
              <IconContainer icon={item.icon} iconProps={item.iconProps} disabled={disabled} />
            ) : null}
            <Text
              style={[
                styles.title,
                item.icon &&
                  (Device.isPad || orientation.landscape
                    ? styles.titleWithIconRow
                    : styles.titleWithIcon),
                item.titleStyle,
                {
                  color: disabled
                    ? colors.palette.gray3
                    : item.titleStyle?.color
                    ? item.titleStyle?.color
                    : item.icon
                    ? colors.secondaryLabel
                    : colors.palette.primary6,
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      },
      [orientation, disabled],
    );

    return (
      <View
        style={[
          styles.container,
          rest.style,
          {
            borderColor: colors.separator,
            minHeight: BOTTOM_TABS_HEIGHT,
          },
          displayStyle,
          borderStyle,
          paddingStyle,
        ]}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurAmount={60}
          blurType={isDark ? 'materialDark' : 'materialLight'}
        />
        {list.map((item) => {
          return item.type === 'menu' ? (
            <View
              style={{
                width: `${100 / list.length}%`,
              }}
            >
              <item.PopoverMenu disabled={disabled}>
                <ToolbarItem
                  style={{
                    width: '100%',
                  }}
                  key={item.key}
                  item={item}
                />
              </item.PopoverMenu>
            </View>
          ) : (
            <ToolbarItem key={item.key} item={item} />
          );
        })}
      </View>
    );
  },
);

function IconContainer({
  icon,
  iconProps,
  disabled,
}: Pick<IToolbarItem, 'icon' | 'iconProps'> & { disabled: boolean }) {
  const { colors } = useTheme();
  const Icon = icon;
  return typeof icon === 'string' ? (
    <SFSymbol
      name={icon}
      color={disabled ? colors.palette.gray3 : colors.palette.primary6}
      style={{
        width: 26,
        height: 26,
      }}
      {...(iconProps as SFSymbolProps)}
    />
  ) : (
    <Icon
      width={26}
      height={26}
      {...iconProps}
      fill={
        disabled ? colors.palette.gray3 : (iconProps as SvgProps)?.fill ?? colors.palette.primary6
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    position: 'absolute',
    width: '100%',
  },
  item: {
    alignItems: 'center',
  },
  itemRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  titleWithIcon: {
    fontSize: 11,
    marginTop: 6,
  },
  titleWithIconRow: {
    fontSize: 10,
    marginLeft: 6,
  },
});
