import * as ClassifyImage from 'react-native-classify-image';

import { reportException } from '@/utils';
import { PhotoTask } from './PhotoTask';
import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';

class ClassifyImageTask extends PhotoTask {
  public async start(): PVoid {
    this.stop();

    this.status = 'STARTED';
    this.sendEvent('start');

    try {
      const images = await this.fetchAllImages();
      const untreatedImages = images.filter((item) => item.uri && !item.labels);
      this.progress = images.length - untreatedImages.length;

      untreatedImages.forEach(async (image, index) => {
        if (this.status !== 'STARTED' || !image.uri) {
          return;
        }

        try {
          const result = await ClassifyImage.request(image.uri, {
            minConfidence: 0.7,
            usesCPUOnly: __DEV__,
          });

          await this.updateImageLabels(image.id as string, result);
          this.sendEvent('progress', {
            progress: ++this.progress,
            total: images.length,
          });
          untreatedImages.splice(index, 1);
        } catch (error) {
          this.sendEvent('error', error);
        }
      });
    } catch (error) {
      this.sendEvent('error', error);
    }
    // 所有图片数据
  }

  private async updateImageLabels(
    id: string,
    labels?: {
      confidence: number;
      identifier: {
        en: string;
        zh_cn: string;
      };
    }[],
  ) {
    const labelsEN = labels?.map((label) => label.identifier.en);
    const labelsZH_CN = labels?.map((label) => label.identifier.zh_cn);

    return await AppDataSource.manager.update(Photo, id, {
      labels: {
        en: labelsEN,
        zh_cn: labelsZH_CN,
      },
    });
  }
}

export const classifyImageTask = new ClassifyImageTask();

classifyImageTask.once('error', (error) => {
  reportException({ error, message: '获取图片类型' });
});
