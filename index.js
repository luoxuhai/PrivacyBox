import './app/utils/initGlobalValues';

import React from 'react';
import { AppRegistry } from 'react-native';

import App from './app/app.tsx';
import { initBasePath } from './app/utils/initBasePath';
import { name } from './app.json';

initBasePath();

function Main() {
  return <App />;
}

AppRegistry.registerComponent(name, () => Main);
