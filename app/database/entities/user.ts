import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string
}
