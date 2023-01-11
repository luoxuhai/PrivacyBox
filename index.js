// This is the first file that ReactNative will run when it starts up.

import App from './app/app.tsx';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { AppRegistry } from 'react-native';

BootSplash.hide({ fade: true, duration: 0 });

// 手动设置 __DEV__ 标识
__DEV__ = false;

function Main() {
  return <App />;
}

AppRegistry.registerComponent('PrivacyBox', () => Main);
