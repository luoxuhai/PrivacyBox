import {
  defaultICloudContainerPath,
  download,
  PathUtils,
  writeFile,
  upload,
  stat,
  exist,
  createDir,
  onICloudDocumentsStartGathering,
} from 'react-native-cloud-store';

import { APP_BASE_DIR } from '@/constants';

onICloudDocumentsStartGathering((data) => {
  console.log('onICloudDocumentsStartGathering', data);
});

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

  static upload(
    localPath: string,
    path: string,
    options?: {
      onProgress: (data: { progress: number }) => void;
    },
  ) {
    upload(localPath, PathUtils.join(this.iCloudBasePath, path), options);
  }

  static download() {}

  static exist(path: string) {
    return exist(PathUtils.join(this.iCloudBasePath, path));
  }

  static createDir(path: string) {
    return createDir(PathUtils.join(this.iCloudBasePath, path));
  }

  static stat() {}

  static remove() {}
}
