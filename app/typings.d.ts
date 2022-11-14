import { ColorValue } from 'react-native';
import { SvgProps as _SvgProps } from 'react-native-svg';

declare global {
  type PVoid = Promise<void>;

  type Color = ColorValue;

  type SvgProps = _SvgProps;

  type Appearance = 'light' | 'dark';
}
