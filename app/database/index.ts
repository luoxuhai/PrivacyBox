import { DataSource } from 'typeorm';
import { typeORMDriver } from 'react-native-quick-sqlite';

import { databaseName } from './constants';
import File from './entities/file';
import Photo from './entities/photo';
import { LocalPathManager } from '@/utils';

export const AppDataSource = new DataSource({
  type: 'react-native',
  location: LocalPathManager.dbPath,
  database: databaseName,
  driver: typeORMDriver,
  synchronize: true,
  logging: ['error'],
  entities: [Photo, File],
});
