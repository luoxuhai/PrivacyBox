export const albumKeys = {
  all: ['albums'] as const,
  lists: () => [...albumKeys.all, 'list'] as const,
  list: (filter: Record<string, any>) => [...albumKeys.lists(), { filter }] as const,
  details: () => [...albumKeys.all, 'detail'] as const,
  detail: (id: string) => [...albumKeys.details(), id] as const,
  create: (id: string) => [...albumKeys.details(), id] as const,
};
