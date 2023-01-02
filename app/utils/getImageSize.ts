import { Image } from 'react-native';
import { reportException } from './crashReporting';

export function getImageSize(uri: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) =>
        resolve({
          width,
          height,
        }),
      (reason) => {
        reject(reason);
        reportException({ message: '获取图片大小错误', level: 'fatal' });
      },
    );
  });
}
