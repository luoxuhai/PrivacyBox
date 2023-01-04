import { Overlay } from '@/utils';
import { saveToLibraryAsync } from 'expo-media-library';

export async function exportPhotos(uris: string[]) {
  const timer = setTimeout(() => {
    Overlay.alert({
      preset: 'spinner',
      duration: 0,
    });
  }, 1000);

  try {
    for (const uri of uris) {
      await saveToLibraryAsync(uri);
    }
    Overlay.alert({
      preset: 'done',
      title: '已导出',
    });
  } catch (error) {
    console.error(error);
    Overlay.alert({
      preset: 'error',
      title: '导出失败',
    });
  } finally {
    clearTimeout(timer);
  }
}
