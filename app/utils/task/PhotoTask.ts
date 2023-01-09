import { Task } from './Task';
import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { PhotoTypes, Status } from '@/database/entities/types';
import { joinPhotoUri } from '@/services/local/helpers/joinPhotoUri';
import { joinPhotoThumbnail } from '@/services/local/helpers/joinPhotoThumbnail';
import { joinVideoPoster } from '@/services/local/helpers/joinVideoPoster';

export interface FetchAllImagesResult
  extends Pick<Photo, 'image_details' | 'video_details' | 'type' | 'labels' | 'name' | 'id'> {
  uri: string;
  thumbnail: string;
}

export interface FetchAllVideosResult extends Omit<FetchAllImagesResult, 'labels'> {
  poster: string;
}

const commonSelect = {
  id: true,
  name: true,
  type: true,
};

export class PhotoTask extends Task {
  /**
   * 获取所以味删除的图片
   */
  public async fetchAllImages() {
    const images = (await AppDataSource.manager.find(Photo, {
      select: {
        ...commonSelect,
        image_details: {
          width: true,
          height: true,
        },
        labels: {
          zh_cn: true,
          en: true,
        },
      },
      where: {
        status: Status.Normal,
        type: PhotoTypes.Photo,
      },
    })) as unknown as FetchAllImagesResult[];

    for (const image of images) {
      image.uri = joinPhotoUri(image);
      image.thumbnail = joinPhotoThumbnail(image.id);
    }

    return images;
  }

  /**
   * 获取所以视频
   */
  public async fetchAllVideos(): Promise<FetchAllVideosResult[]> {
    const videos = (await AppDataSource.manager.find(Photo, {
      select: {
        ...commonSelect,
        video_details: {
          width: true,
          height: true,
          duration: true,
        },
      },
      where: {
        status: Status.Normal,
        type: PhotoTypes.Video,
      },
    })) as unknown as FetchAllVideosResult[];

    for (const video of videos) {
      video.uri = joinPhotoUri(video);
      video.thumbnail = joinPhotoThumbnail(video.id);
      video.poster = joinVideoPoster(video.id);
    }

    return videos;
  }
}
