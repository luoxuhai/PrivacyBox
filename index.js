import './app/utils/initGlobalValues';

import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { AppRegistry } from 'react-native';

import App from './app/app.tsx';

function Main() {
  return <App />;
}

AppRegistry.registerComponent('PrivacyBox', () => Main);
