import FS from 'react-native-fs';

import SQLite from '@rn-kit/sqlite';
import { LocalPathManager } from '@/utils';
import { User, UserType } from './entities/user';
import { File } from './entities/file';

SQLite.enablePromise(true);

const DB_NAME = 'private-space';

export class DataBaseV1 {
  private static db: any;

  static async init(): PVoid {
    console.log('LocalDatabase:', `${LocalPathManager.libraryPath}/LocalDatabase`);
    try {
      const isExistDB = await FS.exists(`${LocalPathManager.libraryPath}/LocalDatabase/${DB_NAME}`);
      if (!isExistDB) {
        console.log('[isExistDB]', '不存在DB v1');
        return;
      }

      // 打开数据库
      this.db = await SQLite.openDatabase({ name: DB_NAME, location: 'default' });

      __DEV__ && console.log('数据库连接成功！');
    } catch (error) {
      __DEV__ && console.log('数据库连接失败！', error);
    }
  }

  // 读取密码
  public static queryAllPassword(): Promise<{
    admin?: string;
    ghost?: string;
  }> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT password,type FROM user',
          [],
          (_, results) => {
            const users = results.rows.raw() as User[];
            const adminPassword = users.find((item) => item.type === UserType.ADMIN).password;
            const ghostPassword = users.find((item) => item.type === UserType.GHOST).password;
            resolve({
              admin: adminPassword,
              ghost: ghostPassword,
            });
          },
          reject,
        );
      });
    });
  }

  // 读取文件
  public static queryFiles(): Promise<File[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM file',
          [],
          (_, results) => {
            resolve(results.rows.raw() as File[]);
          },
          reject,
        );
      });
    });
  }

  static clear(): void {
    this.db?.close(() => {
      FS.unlink(`${LocalPathManager.libraryPath}/LocalDatabase`);
    });
  }

  static queryFileCount(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT count(*) FROM file',
          [],
          (_, results) => {
            resolve(results.rows.item(0)?.['count(*)'] ?? 0);
          },
          reject,
        );
      });
    });
  }
}
