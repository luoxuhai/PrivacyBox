import { DataSource } from 'typeorm';
import { typeORMDriver } from 'react-native-quick-sqlite';

import { databaseName } from './constants';
import File from './entities/file';
import User from './entities/user';
import { LocalPathManager } from '@/utils';

export const AppDataSource = new DataSource({
  type: 'react-native',
  location: LocalPathManager.dbPath,
  database: databaseName,
  driver: typeORMDriver,
  synchronize: true,
  logging: ['error'],
  entities: [File, User],
});
