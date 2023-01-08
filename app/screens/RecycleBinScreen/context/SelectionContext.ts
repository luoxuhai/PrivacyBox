import { FetchPhotosResult } from '@/services/local';
import { createContext } from 'react';

export interface SelectionContextValue {
  enabled: boolean;
  isSelectAll: boolean;
  items: FetchPhotosResult[];
}

export const SelectionInitialValue: SelectionContextValue = {
  enabled: false,
  isSelectAll: false,
  items: [],
};

export const SelectionContext = createContext<SelectionContextValue>(SelectionInitialValue);

export const SelectionContextProvider = SelectionContext.Provider;
