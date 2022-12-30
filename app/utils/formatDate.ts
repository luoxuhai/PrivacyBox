import { format } from 'date-fns';
import zh from 'date-fns/locale/zh-CN';
import en from 'date-fns/locale/en-US';

import { locale, SupportedLanguage } from '@/i18n';

type Options = Parameters<typeof format>[2];

export const formatDate = (timestamp: number, dateFormat?: string, options?: Options) => {
  const dateOptions: Options = {
    ...options,
    locale: locale.languageCode === SupportedLanguage.ZH ? zh : en,
  };

  return format(timestamp, dateFormat ?? 'yyyy-MM-dd', dateOptions);
};
