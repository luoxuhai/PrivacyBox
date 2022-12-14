import { DataSource } from 'typeorm';
import { typeORMDriver } from 'react-native-quick-sqlite';

import { location, databaseName } from './constants';
import File from './entities/file';
import User from './entities/user';

export const AppDataSource = new DataSource({
  type: 'react-native',
  location: '.',
  database: databaseName,
  driver: typeORMDriver,
  synchronize: true,
  logging: ['error'],
  entities: [File, User],
});
