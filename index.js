import './app/utils/initGlobalValues';

import React from 'react';
import { AppRegistry } from 'react-native';

import './app/utils/disableFontScaling';
import App from './app/app.tsx';
import { initBasePath } from './app/utils/initBasePath';
import { initCrashReporting } from './app/utils/crashReporting';
import { name } from './app.json';

initBasePath();

if (!__DEV__) {
  initCrashReporting();
}

function Main() {
  return <App />;
}

AppRegistry.registerComponent(name, () => Main);
