import { TextKeyPath } from '@/i18n';
import { AppIcons } from './types';

export const appIconOptions: {
  title: TextKeyPath;
  name: AppIcons;
  env?: 'all';
}[] = [
  {
    title: 'appIconName.default',
    name: AppIcons.Default,
    env: 'all',
  },
  {
    title: 'appIconName.old',
    name: AppIcons.Old,
    env: 'all',
  },
  {
    title: 'appIconName.calculator',
    name: AppIcons.Calculator,
  },
  {
    title: 'appIconName.passwordBox',
    name: AppIcons.PasswordBox,
  },
  {
    title: 'appIconName.clock',
    name: AppIcons.Clock,
  },
  {
    title: 'appIconName.housekeeper',
    name: AppIcons.Housekeeper,
  },
  {
    title: 'appIconName.todo',
    name: AppIcons.Todo,
  },
  {
    title: 'appIconName.weather',
    name: AppIcons.Weather,
  },
  {
    title: 'appIconName.news',
    name: AppIcons.News,
  },
];
