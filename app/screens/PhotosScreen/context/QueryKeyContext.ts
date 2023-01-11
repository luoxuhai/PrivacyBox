import { createContext } from 'react';
import { QueryKey } from '@tanstack/react-query';

export const QueryKeyInitialValue: QueryKey = null;

export const QueryKeyContext = createContext<QueryKey>(QueryKeyInitialValue);

export const QueryKeyContextProvider = QueryKeyContext.Provider;
