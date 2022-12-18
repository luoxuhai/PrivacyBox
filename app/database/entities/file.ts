import {
  Entity,
  Column,
  VersionColumn,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
} from 'typeorm/browser';

import { Status } from './photo';

/**
 * 资源类型
 */
export enum SourceType {
  Unknown = 0,
  Text,
  Image,
  Audio,
  Video,
  Application,
  Model,
}

interface FileMetadata {
  compressed?: number;
  hash?: string;
}

type Extra = {
  [key: string]: any;
};

@Entity('file')
export default class File {
  @PrimaryColumn('varchar', {
    unique: true,
  })
  id!: string;

  /**
   * 父级文件夹id
   */
  @Column('varchar', { nullable: true })
  parent_id!: string | null;

  /**
   * 所有者，保留字段
   */
  @Column('varchar', { nullable: true })
  owner?: string;

  /**
   * 是否为伪装数据
   */
  @Column('boolean', { default: false })
  is_fake?: boolean;

  /**
   * 是否为伪装数据
   */
  @Column('int', { default: Status.Normal })
  status?: Status;

  /**
   * 文件名称
   */
  @Column('varchar', { nullable: false })
  name!: string;

  /**
   * 是否为我文件夹
   */
  @Column('boolean', {
    default: true,
  })
  is_folder?: boolean;

  /**
   * 文件大小
   */
  @Column('int', { default: 0 })
  size?: number;

  @Column('varchar', { nullable: true })
  mime?: string;

  /**
   * 元数据
   */
  @Column('simple-json', { nullable: true })
  metadata?: FileMetadata;

  /**
   * 额外附加数据
   */
  @Column('simple-json', { nullable: true })
  extra?: Extra;

  /**
   * 创建时间
   */
  @Column('bigint', { nullable: true })
  created_date?: number;

  /**
   * 更新时间
   */
  @Column('bigint', { nullable: true })
  updated_date?: number;

  /**
   * 软删除时间，恢复后清空
   */
  @Column('bigint', { nullable: true })
  deleted_date?: number;

  /**
   * 版本，自动生成
   */
  @VersionColumn({ default: 0 })
  version?: number;
}
