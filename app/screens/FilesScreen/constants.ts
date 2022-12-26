export const fileKeys = {
  all: ['files'] as const,
  lists: () => [...fileKeys.all, 'list'] as const,
  list: (filters: string) => [...fileKeys.lists(), { filters }] as const,
  details: () => [...fileKeys.all, 'detail'] as const,
  detail: (id: number) => [...fileKeys.details(), id] as const,
  create: (id: number) => [...fileKeys.details(), id] as const,
};


export enum FileImportTypes {
  Scan = 1,
  Document,
  Folder,
}