import { View, ColorValue, ViewStyle } from 'react-native';
import { SFSymbol } from 'react-native-sfsymbols';

interface SettingsIconProps {
  backgroundColor: ColorValue;
  backgroundSize?: number;
  iconSize?: number;
  systemName?: string;
}

export function SettingsIcon(props: SettingsIconProps) {
  const { backgroundSize = 32, iconSize = 16, systemName } = props;

  return (
    <View
      style={[
        $container,
        {
          backgroundColor: props.backgroundColor,
          width: backgroundSize,
          height: backgroundSize,
        },
      ]}
    >
      {systemName && <SFSymbol name={systemName} size={iconSize} />}
    </View>
  );
}

const $container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 10,
};