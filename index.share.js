import 'intl-pluralrules';
import '@/locales';
import { AppRegistry } from 'react-native';

import ShareExtension from './src/extensions/Share';

AppRegistry.registerComponent('ShareMenuModuleComponent', () => ShareExtension);
