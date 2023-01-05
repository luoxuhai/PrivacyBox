import { createContext } from 'react';

import Photo from '@/database/entities/photo';

/**
 * DESC: 降序
 */
type OrderBy<T> = {
  [key in keyof T]: 'DESC' | 'ASC';
};

export interface PhotoSettingsContextValue {
  orderBy: OrderBy<Partial<Photo>>;
}

export const PhotoSettingsInitialValue: PhotoSettingsContextValue = {
  orderBy: {
    created_date: 'DESC',
  },
};

export const PhotoSettingsContext =
  createContext<PhotoSettingsContextValue>(PhotoSettingsInitialValue);

export const PhotoSettingsContextProvider = PhotoSettingsContext.Provider;
