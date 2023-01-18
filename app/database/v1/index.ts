import FS from 'react-native-fs';

import SQLite from '@rn-kit/sqlite';
import { User, UserType } from './entities/user';
import { File } from './entities/file';
import { DB_NAME, OLD_DB_PATH } from '@/screens/DataMigratorScreen/constants';

SQLite.enablePromise(true);

export class DataBaseV1 {
  private static db: any;

  static async init(): PVoid {
    try {
      const isExistDB = await FS.exists(OLD_DB_PATH);
      if (!isExistDB) {
        return;
      }

      // 打开数据库
      this.db = await SQLite.openDatabase({ name: DB_NAME, location: 'default' });

      __DEV__ && console.log('数据库连接成功！');
    } catch (error) {
      __DEV__ && console.log('数据库连接失败！', error);
    }
  }

  // 读取用户
  public static queryAllUsers(): Promise<{
    admin?: User;
    ghost?: User;
  }> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM user',
          [],
          (_, results) => {
            const users = results.rows.raw() as User[];
            const admin = users.find((item) => item.type === UserType.ADMIN);
            const ghost = users.find((item) => item.type === UserType.GHOST);
            resolve({
              admin,
              ghost,
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
      this.db.executeSql(
        'SELECT * FROM file',
        [],
        (_, results) => {
          resolve(results.rows.raw() as File[]);
        },
        reject,
      );
    });
  }

  static close(onCallback: () => void) {
    return this.db?.close(onCallback, onCallback);
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
