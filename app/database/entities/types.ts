/**
 * 文件类型
 */
export enum FileTypes {
  Unknown = 0,
  Folder,
  Text,
  Image,
  Audio,
  Video,
  Application,
  Model,
}

export enum PhotoTypes {
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
