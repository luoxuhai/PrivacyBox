import { t } from '@/i18n';
import { FilterTypes } from '../../constants';

export const filterOptions = [
  {
    label: t('photoSearchPanel.all'),
    key: FilterTypes.All,
  },
  {
    label: t('photoSearchPanel.album'),
    key: FilterTypes.Album,
  },
  {
    label: t('photoSearchPanel.image'),
    key: FilterTypes.Image,
  },
  {
    label: t('photoSearchPanel.video'),
    key: FilterTypes.Video,
  },
];
