import { t } from '@/i18n';
import { Overlay } from '@/utils';
import { saveToLibraryAsync } from 'expo-media-library';

export async function exportPhotos(uris: string[]) {
  const timer = setTimeout(() => {
    Overlay.alert({
      preset: 'spinner',
      duration: 0,
    });
  }, 1000);

  const failedUris: string[] = [];
  for (const uri of uris) {
    try {
      await saveToLibraryAsync(encodeURI(uri));
    } catch (error) {
      failedUris.push(uri);
    }
  }

  clearTimeout(timer);
  if (failedUris.length) {
    Overlay.alert({
      preset: 'error',
      title: t('photosScreen.export.fail'),
      message: t('photosScreen.export.fail', {
        count: failedUris.length,
      }),
    });
  } else {
    Overlay.alert({
      preset: 'done',
      title: t('photosScreen.export.success'),
    });
  }
}
