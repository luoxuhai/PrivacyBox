import { format, parseISO } from 'date-fns';
import zh from 'date-fns/locale/zh-CN';
import en from 'date-fns/locale/en-US';

import { locale, SupportedLanguage } from '../i18n';

type Options = Parameters<typeof format>[2];

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const dateOptions = {
    ...options,
    locale: locale.languageCode === SupportedLanguage.ZH ? zh : en,
  };
  return format(parseISO(date), dateFormat ?? 'MMM dd, yyyy', dateOptions);
};
