export const photoKeys = {
  all: ['photos'] as const,
  lists: () => [...photoKeys.all, 'list'] as const,
  list: (filter: string, order?: OrderBy<any>) =>
    [...photoKeys.lists(), { filter, order }] as const,
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
