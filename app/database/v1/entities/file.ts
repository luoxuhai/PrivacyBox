/**
 * 资源类型
 */
export const enum SourceType {
  Unknown = 0,
  Text,
  Image,
  Audio,
  Video,
  Application,
  Model,
}

export const enum FileType {
  // 文件
  File = 1,
  // 文件夹
  Folder = 2,
}

export const enum FileStatus {
  // 正常
  Normal = 1,
  // 已删除
  Deleted = 2,
}

/** 存储位置 */
export const enum FileRepository {
  /** 相册 */
  Album = 1,
  /** 文件管理 */
  File = 2,
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

interface FileLabel {
  en?: string[];
  zh_cn?: string[];
}

interface FileMetadata {
  width?: number;
  height?: number;
  duration?: number;
  compressed?: number;
  hash?: string;
}

export interface File {
  id?: string;

  parent_id?: string | null;

  owner: string;

  name: string;

  type?: FileType;

  mime?: string;

  status?: FileStatus;

  repository?: FileRepository;

  size?: number;

  ctime: number;

  mtime: number;

  labels?: FileLabel;

  description?: string;

  metadata?: FileMetadata;

  extra?: FileExtra;

  version?: number;
}
