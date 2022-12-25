import {
  defaultICloudContainerPath,
  download,
  PathUtils,
  writeFile,
  stat,
} from 'react-native-cloud-store';

import { APP_BASE_DIR } from '@/constants';

console.log(
  'PathUtils.join(defaultICloudContainerPath, APP_BASE_DIR);',
  PathUtils.join(defaultICloudContainerPath, APP_BASE_DIR),
);

writeFile(PathUtils.join(defaultICloudContainerPath, APP_BASE_DIR, 'test.txt'), 'xxxtest ', {
  override: true,
});

stat(PathUtils.join(defaultICloudContainerPath, APP_BASE_DIR, 'test.txt')).then(console.log);
download(PathUtils.join(defaultICloudContainerPath, APP_BASE_DIR, 'test.txt'), {
  onProgress(v) {
    console.log('onProgress', v);
  },
}).then(console.log);

export class ICloud {
  public static iCloudBasePath = PathUtils.join(defaultICloudContainerPath, APP_BASE_DIR);

  static upload() {}

  static download() {}

  static exist() {}

  static stat() {}

  static remove() {}
}
