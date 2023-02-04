import { NativeModules } from 'react-native';

interface Options {
  duration: number;
  particles?: ('triangle' | 'arc' | 'circle' | 'heart' | 'polygon' | 'star')[];
  animation?: 'centerWidthToDown' | 'centerWidthToUp' | 'fullWidthToDown' | 'fullWidthToUp';
}

export async function start(options: Options): Promise<void> {
  return await NativeModules.RNConfetti.start(options);
}

export async function stop() {
  NativeModules.RNConfetti.stop();
}
