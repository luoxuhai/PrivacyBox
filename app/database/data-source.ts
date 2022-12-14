import { DataSource } from 'typeorm';
import './constants';

import File from './entities/file';
import User from './entities/user';

const location = 'Shared';

export const AppDataSource = new DataSource({
  type: 'react-native',
  location,
  database: 'privacy_box',
  synchronize: true,
  logging: ['error'],
  entities: [File, User],
});
