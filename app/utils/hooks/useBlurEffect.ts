import { useIsFocused } from '@react-navigation/native';
import { useEffect, EffectCallback } from 'react';

export function useBlurEffect(effect: EffectCallback) {
  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      effect();
    };
  }, []);

  useEffect(() => {
    if (!isFocused) {
      effect();
    }
  }, [isFocused]);
}
