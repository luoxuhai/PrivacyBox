export const albumKeys = {
  all: ['albums'] as const,
  lists: () => [...albumKeys.all, 'list'] as const,
  list: (filters: string) => [...albumKeys.lists(), { filters }] as const,
  details: () => [...albumKeys.all, 'detail'] as const,
  detail: (id: string) => [...albumKeys.details(), id] as const,
  create: (id: string) => [...albumKeys.details(), id] as const,
};
