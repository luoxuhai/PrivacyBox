import { ColorValue } from 'react-native';
import { SvgProps as _SvgProps } from 'react-native-svg';

declare global {
  type PVoid = Promise<void>;

  type Color = ColorValue;

  type SvgProps = _SvgProps;

  type Appearance = 'light' | 'dark';

  type AppearanceMode = Appearance | 'auto';

  interface Console {
    prettyLog(message?: any, ...optionalParams: any[]): void;
  }

  interface Location {
    latitude?: number;
    longitude?: number;
    altitude?: number;
    speed?: number;
  }

  /**
   * DESC: 降序
   */
  type OrderBy<T> = {
    [key in keyof T]: 'DESC' | 'ASC';
  };
}
