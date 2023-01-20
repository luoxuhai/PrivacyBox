import './app/utils/initGlobalValues';

import { enableFreeze } from 'react-native-screens';
import React from 'react';
import { AppRegistry } from 'react-native';

import App from './app/app.tsx';

enableFreeze(true)

function Main() {
  return <App />;
}

AppRegistry.registerComponent('PrivacyBox', () => Main);
