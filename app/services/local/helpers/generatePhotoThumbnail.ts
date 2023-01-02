import { ThumbnailGenerator } from 'react-native-app-toolkit';
import { joinPhotoThumbnail } from './joinPhotoThumbnail';

/**
 * 生成缩略图
 * @param id
 * @param uri
 */
export async function generatePhotoThumbnail(id: string, uri: string) {
  const thumbnail = joinPhotoThumbnail(id);


  await ThumbnailGenerator.generate({
    path: uri,
    toFileAtURL: thumbnail,
    width: 300,
    height: 300,
    scale: 1,
    iconMode: false,
    representationType: 'lowQualityThumbnail',
  });
}
