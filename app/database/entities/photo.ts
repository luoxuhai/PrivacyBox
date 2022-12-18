import {
  Entity,
  Column,
  PrimaryColumn,
  VersionColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm/browser';

interface PhotoMetadata {
  compressed?: number;
  hash?: string;
}

interface ImageDetails {
  width?: number;
  height?: number;
  duration?: number;
}

interface VideoDetails {
  width?: number;
  height?: number;
}

type Extra = {
  /** 文件资源ID */
  source_id?: string;
  /** 文件资源Hash */
  source_hash?: string;
  /** 文件夹封面 */
  cover?: string | null;
  blurhash?: string;
  [key: string]: any;
};

export enum PhotoType {
  Folder = 1,
  // 图片
  Photo = 2,
  // 视频
  Video = 3,
  //
  LivePhoto = 4,
}

export enum Status {
  Normal = 1,
  Deleted = 1,
}

@Entity('photo')
export default class Photo {
  @PrimaryColumn('varchar', {
    unique: true,
  })
  id!: string;

  /**
   * 所属相册id
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
   * 图片/相册名称
   */
  @Column('varchar', { nullable: false })
  name!: string;

  /**
   * 图片/相册描述
   */
  @Column('text', { nullable: true })
  description?: string;

  /**
   * 文件大小
   */
  @Column('int', { default: 0 })
  size?: number;

  /**
   * 资源等类型
   */
  @Column('int', { nullable: false })
  type!: PhotoType;

  /**
   * 图片/视频标签
   */
  @Column('simple-json', { nullable: true })
  labels?: FileLabel;

  @Column('varchar', { nullable: true })
  mime?: string;

  /**
   * 原信息
   */
  @Column('simple-json', { nullable: true })
  metadata?: PhotoMetadata;

  /**
   * 图片详情信息
   */
  @Column('simple-json', { nullable: true })
  image_details?: ImageDetails;

  /**
   * 视频详情信息
   */
  @Column('simple-json', { nullable: true })
  video_details?: VideoDetails;

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
