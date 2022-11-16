// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import App from './app/app.tsx';
import React from 'react';
import { AppRegistry, Text } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

function Main() {
  RNBootSplash.hide();

  return <Text>xxxx</Text>;
  // return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent('PrivacyBox', () => Main);
export default App;
