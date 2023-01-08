import { VideoThumbnail } from 'react-native-app-toolkit';
import { moveFile } from 'react-native-fs';

import { joinVideoPoster } from './joinVideoPoster';

export async function generateVideoPoster(id: string, uri: string, duration: number) {
  const poster = joinVideoPoster(id);

  const startTime = duration < 1000 ? Math.round(duration / 2) : 1000;
  const result = await VideoThumbnail.getThumbnail(
    uri.startsWith('file://') ? uri : `file://${uri}`,
    {
      time: startTime,
      quality: 1,
    },
  );

  await moveFile(result.uri, poster);
}