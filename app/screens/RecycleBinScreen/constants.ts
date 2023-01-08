export const recycleBinKeys = {
  all: ['recycleBin'] as const,
  lists: () => [...recycleBinKeys.all, 'list'] as const,
  list: (filter: ListFilter) => [...recycleBinKeys.lists(), { filter }] as const,
};

interface ListFilter {
  inFakeEnvironment: boolean;
}
