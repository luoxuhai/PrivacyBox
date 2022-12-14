import { useEffect, useState } from 'react';
import { AppDataSource } from '../data-source';

export function useInitialDataSource() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    AppDataSource.initialize().then((res) => {
      setIsInitialized(res.isInitialized);
    });
  }, []);

  return { isInitialized };
}
