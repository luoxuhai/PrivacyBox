import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { moveFile, exists } from 'react-native-fs';

import { joinPhotoThumbnail } from './joinPhotoThumbnail';
import { joinVideoPoster } from './joinVideoPoster';

const TARGET_WIDTH = 400;

/**
 * 生成缩略图
 * @param id
 * @param uri
 */
export async function generatePhotoThumbnail({
  id,
  isVideo,
  uri,
}: {
  id: string;
  uri: string;
  isVideo: boolean;
}) {
  const sourceUri = isVideo ? joinVideoPoster(id) : uri;

  if (!(await exists(sourceUri))) {
    console.error('[ 没有图片 ]');
    return;
  }

  const thumbnail = joinPhotoThumbnail(id);
  const compressedUri = await resizeImage({ uri: sourceUri, width: TARGET_WIDTH });
  await moveFile(compressedUri, thumbnail);
}

export async function resizeImage({
  uri,
  width,
  compress = 0.5,
}: {
  uri: string;
  width: number;
  compress?: number;
}): Promise<string> {
  const _uri = encodeURI(uri.startsWith('file://') ? uri : `file://${uri}`);
  const res = await manipulateAsync(
    _uri,
    [
      {
        resize: {
          width,
        },
      },
    ],
    { compress, format: SaveFormat.JPEG, base64: false },
  );

  return res.uri;
}
