import {
  LibraryDirectoryPath,
  TemporaryDirectoryPath,
  DocumentDirectoryPath,
} from 'react-native-fs';

export class LocalPathManager {
  public static groupPath: string;
  public static readonly libraryPath = LibraryDirectoryPath;
  public static readonly temporaryPath = TemporaryDirectoryPath;
  public static readonly documentPath = DocumentDirectoryPath;

  static get rootPath() {
    return this.groupPath;
  }
}

console.log('[LibraryDirectory]', LocalPathManager.libraryPath);
console.log('[DocumentDirectoryPath]', LocalPathManager.documentPath);
