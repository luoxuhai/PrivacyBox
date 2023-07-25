import * as Localization from 'react-native-localize';
import i18n from 'i18next';

import en, { Translations } from './en';
import zh from './zh';
import ja from './ja';

/* -> [
  { countryCode: "GB", languageTag: "en-GB", languageCode: "en", isRTL: false },
  { countryCode: "US", languageTag: "en-US", languageCode: "en", isRTL: false },
  { countryCode: "FR", languageTag: "fr-FR", languageCode: "fr", isRTL: false },
] */
export const locale = {
  ...Localization.getLocales()[0],
  currencies: Localization.getCurrencies()[0],
  country: Localization.getCountry(),
  timeZone: Localization.getTimeZone(),
};

export enum SupportedLanguage {
  EN = 'en',
  ZH = 'zh',
  JA = 'ja',
  DE = 'de',
  ES = 'es',
  PT = 'pt',
  FR = 'fr',
}

export const LanguageReadable = {
  [SupportedLanguage.ZH]: '简体中文',
  [SupportedLanguage.EN]: 'English',
  [SupportedLanguage.JA]: '日本語',
  [SupportedLanguage.DE]: 'Deutsch',
  [SupportedLanguage.ES]: 'Español',
  [SupportedLanguage.PT]: 'Português',
  [SupportedLanguage.FR]: 'Français',
};

i18n.init({
  compatibilityJSON: 'v3',
  debug: false,
  lng: locale.languageCode,
  fallbackLng: SupportedLanguage.EN,
  supportedLngs: [SupportedLanguage.EN, SupportedLanguage.ZH, SupportedLanguage.JA],
  nonExplicitSupportedLngs: true,
  resources: {
    en: {
      translation: en,
    },
    zh: {
      translation: zh,
    },
    ja: {
      translation: ja,
    },
  },
});

export { i18n };

/**
 * Builds up valid keypaths for translations.
 */
export type TextKeyPath = RecursiveKeyOf<Translations>;

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;
