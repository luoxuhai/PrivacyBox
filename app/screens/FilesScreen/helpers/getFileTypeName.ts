import { FileTypes } from '@/database/entities/types';
import { translate } from '@/i18n';

export function getFileTypeName(type: FileTypes): string {
  switch (type) {
    case FileTypes.Text:
      return translate('filesScreen.types.text');
    case FileTypes.Image:
      return translate('filesScreen.types.image');
    case FileTypes.Audio:
      return translate('filesScreen.types.audio');
    case FileTypes.Video:
      return translate('filesScreen.types.video');
    case FileTypes.Application:
      return translate('filesScreen.types.application');
    case FileTypes.Model:
      return translate('filesScreen.types.model');
    case FileTypes.Folder:
      return translate('filesScreen.types.folder');
    default:
      return translate('filesScreen.types.unknown');
  }
}
