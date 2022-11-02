import { DataSource } from 'typeorm'

import File from './entities/file'
import User from './entities/user'

const dataSource = new DataSource({
  type: 'react-native',
  location: 'default',
  database: 'privacy_box',
  synchronize: true,
  logging: ['error'],
  entities: [File, User],
})

export default dataSource
