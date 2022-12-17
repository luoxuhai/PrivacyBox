import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
} from 'typeorm/browser';

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
export default class File extends BaseEntity {
  @Index({
    unique: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 父级文件夹id
   */
  @Column('varchar', { nullable: true })
  parent_id?: string | null;

  /**
   * 所有者，保留字段
   */
  @Column('varchar', { nullable: true })
  owner?: string;

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
    nullable: true,
  })
  is_folder?: boolean;

  /**
   * 文件大小
   */
  @Column('int', { default: 0, nullable: true })
  size!: number;

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
  @CreateDateColumn()
  created_date!: Date;

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updated_date!: Date;

  /**
   * 软删除时间，恢复后清空
   */
  @Column('date', { nullable: true })
  deleted_date?: Date;

  /**
   * 版本，自动生成
   */
  @VersionColumn({ default: 0 })
  version?: number;
}
