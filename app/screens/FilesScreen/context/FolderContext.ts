import { createContext } from 'react';

export interface FolderContextValue {
  folderId?: string | null;
}

export const FolderContext = createContext<FolderContextValue>(null);

export const FolderContextProvider = FolderContext.Provider;
