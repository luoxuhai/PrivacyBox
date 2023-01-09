import dayjs from 'dayjs';

import { rootStore } from '@/models';
import { AppDataSource } from '@/database';
import Photo from '@/database/entities/photo';
import { Status } from '@/database/entities/types';
import { destroyDeletedPhotos } from '@/services/local';
import { Task } from './Task';
import { reportException } from '../crashReporting';

/**
 * 清理回收站到期文件
 */
class RecycleBinClearerTask extends Task {
  async start(): PVoid {
    try {
      const items = await AppDataSource.manager.find(Photo, {
        select: {
          id: true,
          deleted_date: true,
        },
        where: {
          status: Status.Deleted,
        },
      });

      const keep = rootStore.settingsStore.recycleBinKeep ?? 15;
      const overdueItems = items.filter((item) =>
        dayjs(item.deleted_date).add(keep, 'day').isBefore(dayjs()),
      );

      if (overdueItems.length) {
        const ids = overdueItems.map((item) => item.id);
        destroyDeletedPhotos({
          ids,
          is_fake: rootStore.appLockStore.inFakeEnvironment,
        });
      }
    } catch (error) {
      this.sendEvent('error', error);
    }
  }
}

export const recycleBinClearerTask = new RecycleBinClearerTask();

recycleBinClearerTask.once('error', (error) => {
  reportException({ error, message: '清理回收站到期文件' });
});
