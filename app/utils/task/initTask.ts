import { classifyImageTask } from './classifyImageTask';
import { recycleBinClearerTask } from './recycleBinClearer';
import { thumbnailTask } from './thumbnailTask';

export async function initTask() {
  await thumbnailTask.start();
  await classifyImageTask.start();
  await recycleBinClearerTask.start();
}
