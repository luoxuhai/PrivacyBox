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

  declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
  }
}
