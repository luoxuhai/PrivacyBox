// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import App from './app/app.tsx';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { AppRegistry } from 'react-native';

BootSplash.hide({ fade: true });

function Main(props) {
  return <App {...props} />;
}

AppRegistry.registerComponent('PrivacyBox', () => Main);

export default App;
