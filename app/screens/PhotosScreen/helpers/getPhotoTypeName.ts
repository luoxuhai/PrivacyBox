import { PhotoTypes } from '@/database/entities/types';
import { translate } from '@/i18n';

export function getPhotoTypeName(type: PhotoTypes): string {
  switch (type) {
    case PhotoTypes.Photo:
      return translate('filesScreen.types.image');
    case PhotoTypes.Video:
      return translate('filesScreen.types.video');
    default:
      return translate('filesScreen.types.unknown');
  }
}
