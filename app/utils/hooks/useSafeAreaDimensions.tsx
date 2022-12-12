import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useSafeAreaDimensions() {
  const windowDimensions = useWindowDimensions();
  const { top, left, right, bottom } = useSafeAreaInsets();

  return {
    width: windowDimensions.width - left - right,
    height: windowDimensions.height - top - bottom,
  };
}
