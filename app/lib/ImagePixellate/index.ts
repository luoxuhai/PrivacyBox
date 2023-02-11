import { NativeModules } from 'react-native';

interface Options {
  path: string;
  type?: 'Face' | 'QRCode' | 'Text';
}

export async function request(options: Options): Promise<{ destPath: string }> {
  return await NativeModules.RNImagePixellate.request(options);
}
