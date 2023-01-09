import { PhotoTypes } from '@/database/entities/types';
import { t } from '@/i18n';

export const albumKeys = {
  all: ['albums'] as const,
  lists: () => [...albumKeys.all, 'list'] as const,
  list: (filter: Record<string, any>) => [...albumKeys.lists(), { filter }] as const,
  details: () => [...albumKeys.all, 'detail'] as const,
  detail: (id: string) => [...albumKeys.details(), id] as const,
  create: (id: string) => [...albumKeys.details(), id] as const,
};

export const photoSearchKeys = {
  all: ['photos-search'] as const,
  lists: () => [...photoSearchKeys.all, 'list'] as const,
  list: (filter: PhotoSearchListFilter) => [...photoSearchKeys.lists(), { filter }] as const,
};

interface PhotoSearchListFilter {
  inFakeEnvironment: boolean;
  keywords: string;
  type: FilterTypes;
}

export enum FilterTypes {
  All = 0,
  Album = PhotoTypes.Folder,
  Image = PhotoTypes.Photo,
  Video = PhotoTypes.Video,
}

export const headerSearchBarOptions = {
  shouldShowHintSearchIcon: true,
  hideWhenScrolling: false,
  hideNavigationBar: true,
  placeholder: t('albumsScreen.searchPlaceholder'),
  cancelButtonText: t('common.cancel'),
};
