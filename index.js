import './app/utils/initGlobalValues';

import React from 'react';
import { AppRegistry } from 'react-native';

import App from './app/app.tsx';
import { initBasePath } from './app/utils/initBasePath';
import { lockOrientation } from './app/utils/lockOrientation';
import { initCrashReporting } from './app/utils/crashReporting';
import { name } from './app.json';

initBasePath();

lockOrientation();

if (!__DEV__) {
  initCrashReporting();
}

function Main() {
  return <App />;
}

AppRegistry.registerComponent(name, () => Main);
