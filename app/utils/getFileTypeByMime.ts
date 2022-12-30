import { FileTypes } from '@/database/entities/types';

export function getFileTypeByMime(mime?: string | null): FileTypes {
  if (!mime) return FileTypes.Unknown;

  if (mime.startsWith('image/')) {
    return FileTypes.Image;
  } else if (mime.startsWith('audio/')) {
    return FileTypes.Audio;
  } else if (mime.startsWith('video/')) {
    return FileTypes.Video;
  } else if (mime.startsWith('text/')) {
    return FileTypes.Text;
  } else if (mime.startsWith('application/')) {
    return FileTypes.Application;
  } else if (mime.startsWith('model/')) {
    return FileTypes.Model;
  } else {
    return FileTypes.Unknown;
  }
}
