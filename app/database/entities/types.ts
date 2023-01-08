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
}

export enum PhotoSubtypes {
  // 实况图片
  LivePhoto = 1,
  // 截图
  Screenshot,
  DepthEffect,
  Hdr,
  HighFrameRate,
  Panorama,
  Stream,
  Timelapse,
}

export enum Status {
  Normal = 1,
  Deleted = 2,
}
