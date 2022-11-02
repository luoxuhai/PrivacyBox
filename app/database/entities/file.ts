import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  VersionColumn,
  BaseEntity,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm/browser'

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

export enum FileType {
  // 文件
  File = 1,
  // 文件夹
  Folder = 2,
}

export enum FileStatus {
  // 正常
  Normal = 1,
  // 已删除
  Deleted = 2,
}

/** 存储位置 */
export enum FileRepository {
  /** 相册 */
  Album = 1,
  /** 文件管理 */
  FM = 2,
}

interface FileMetadata {
  width?: number
  height?: number
  duration?: number
  compressed?: number
  hash?: string
}

interface ImageDetail {
  width?: number
  height?: number
}

type FileExtra = {
  /** 文件资源ID */
  source_id?: string;
  /** 文件资源Hash */
  source_hash?: string;
  /** 是否为相册 */
  is_album?: boolean;
  /** 在相册中 */
  in_album?: boolean;
  /** 文件夹封面 */
  cover?: string | null;
  /** 视频时长 */
  duration?: number;
  width?: number;
  height?: number;
  blurhash?: string;
  [key: string]: any;
};

@Entity('file')
export default class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column('varchar', { nullable: true })
  parent_id?: string | null

  @Column('varchar')
  owner!: string

  @Index()
  @Column('varchar')
  name!: string

  @Column('text', { nullable: true, comment: '文件描述' })
  description?: string

  @Column('boolean', {
    default: true,
  })
  is_folder?: boolean

  @Column('int', {
    default: FileStatus.Normal,
    nullable: true,
  })
  status?: FileStatus

  @Column('int', {
    default: FileRepository.Album,
    nullable: true,
  })
  repository?: FileRepository

  @Column('int', { default: 0 })
  size?: number

  @Column('simple-json', { nullable: true, comment: '系统标签' })
  labels?: FileLabel

  @Column('varchar', { nullable: true })
  mime?: string

  @Column('simple-json', { nullable: true, comment: '元数据' })
  metadata?: ImageDetail

  @Column('simple-json', { nullable: true })
  extra?: FileExtra

  @Column('simple-json', { nullable: true })
  image_details: string;

  @Column('simple-json', { nullable: true })
  video_details: string;

  @CreateDateColumn()
  created_date!: Date

  @UpdateDateColumn()
  updated_date!: Date

  @DeleteDateColumn()
  deleted_date!: Date

  @VersionColumn({ default: 0 })
  version?: number
}
