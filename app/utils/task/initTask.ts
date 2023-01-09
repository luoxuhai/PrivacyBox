import { classifyImageTask } from './classifyImageTask';
import { recycleBinClearerTask } from './recycleBinClearer';
import { thumbnailTask } from './thumbnailTask';

// 秒
const wait = __DEV__ ? 1 : 5;

export function initTask() {
  setTimeout(async () => {
    await thumbnailTask.start();
    await classifyImageTask.start();
    await recycleBinClearerTask.start();
  }, wait * 1000);
}
