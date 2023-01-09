import { exists } from 'react-native-fs';

import { reportException } from '@/utils';
import { FetchAllImagesResult, FetchAllVideosResult, PhotoTask } from './PhotoTask';
import { PhotoTypes } from '@/database/entities/types';
import { generatePhotoThumbnail } from '@/services/local/helpers/generatePhotoThumbnail';
import { generateVideoPoster } from '@/services/local/helpers/generateVideoPoster';

/**
 * 图片/视频缩略图、封面处理器
 */
class ThumbnailTask extends PhotoTask {
  public async start(): PVoid {
    this.status = 'STARTED';
    this.sendEvent('start');
    try {
      const images = await this.fetchAllImages();
      const videos = await this.fetchAllVideos();
      const items = [...images, ...videos];

      const untreatedImages: (FetchAllImagesResult | FetchAllVideosResult)[] = [];

      for (const item of items) {
        if (item.type === PhotoTypes.Video) {
          const _item = item as FetchAllVideosResult;
          if (!(await exists(_item.poster))) {
            untreatedImages.push(_item);
          }
        } else if (!(await exists(item.thumbnail))) {
          const _item = item as FetchAllImagesResult;
          untreatedImages.push(_item);
        }
      }

      this.progress = items.length - untreatedImages.length;

      untreatedImages.forEach(async (item, index) => {
        if (this.status !== 'STARTED') {
          return;
        }

        try {
          // 视频需要获取封面
          if (item.type === PhotoTypes.Video) {
            const _item = item as FetchAllVideosResult;
            await generateVideoPoster(_item.id, _item.uri, _item.video_details.duration);
          }

          await generatePhotoThumbnail({
            id: item.id,
            isVideo: item.type === PhotoTypes.Video,
            uri: item.uri,
          });

          this.sendEvent('progress', {
            progress: ++this.progress,
            total: items.length,
          });
          untreatedImages.splice(index, 1);
        } catch (error) {
          this.sendEvent('error', error);
        }
      });
    } catch (error) {
      this.sendEvent('error', error);
    }
  }
}

export const thumbnailTask = new ThumbnailTask();

thumbnailTask.once('error', (error) => {
  reportException({ error, message: '获取封面图任务' });
});
