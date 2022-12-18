import { useEffect, useState } from 'react';
import { AppDataSource } from '..';
import { loadFixtures } from '../seeds';

export function useInitialDataSource() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    AppDataSource.initialize().then((source) => {
      setIsInitialized(source.isInitialized);
      loadFixtures(source.manager);
    });
  }, []);

  return { isInitialized };
}
