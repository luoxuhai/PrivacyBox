export const photoKeys = {
  all: ['photos'] as const,
  lists: () => [...photoKeys.all, 'list'] as const,
  list: (filters: string) => [...photoKeys.lists(), { filters }] as const,
  details: () => [...photoKeys.all, 'detail'] as const,
  detail: (id: string) => [...photoKeys.details(), id] as const,
  create: (id: string) => [...photoKeys.details(), id] as const,
};

export enum PhotoImportTypes {
  Photos = 1,
  Document,
  Camera,
  Download,
}
