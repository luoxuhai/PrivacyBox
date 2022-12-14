import Config from '@/config';
import { useEffect, useState } from 'react';
import FS from 'react-native-fs';

export class AppLocalPath {
  private static groupPath: string;

  static async getGroupPath() {
    if (!this.groupPath) {
      this.groupPath = await FS.pathForGroup(Config.groupIdentifier);
    }
    return this.groupPath;
  }

  static getRootPath() {
    return this.groupPath || this.getGroupPath();
  }
}

export function useInitialGroupPath() {
  const [groupPath, setGroupPath] = useState<string>();

  useEffect(() => {
    AppLocalPath.getGroupPath().then(setGroupPath);
  }, []);

  return { groupPath };
}
