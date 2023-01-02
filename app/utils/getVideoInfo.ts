import { FFprobeKit } from 'ffmpeg-kit-react-native';
import { reportException } from './crashReporting';

export async function getVideoInfo(uri?: string): Promise<{
  /** 毫秒 */
  duration: number;
  width: number;
  height: number;
} | null> {
  if (!uri) return null;

  const session = await FFprobeKit.getMediaInformation(uri);

  try {
    const information = session.getMediaInformation();
    const allProperties = information.getAllProperties();

    const stream = allProperties.streams.find((item) => item.width);
    return {
      duration: Math.round(allProperties.format.duration * 1000),
      width: stream.width,
      height: stream.height,
    };
  } catch (error) {
    reportException({
      error,
      message: '获取视频信息错误',
      level: 'fatal',
    });
    return null;
  }
}
