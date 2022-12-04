import { TextKeyPath } from '@/i18n';
import { AppIcons } from './types';

export const appIconOptions: {
  title: TextKeyPath;
  name: AppIcons;
  needsBuy?: boolean;
}[] = [
  {
    title: 'appIconName.default',
    name: AppIcons.Default,
  },
  {
    title: 'appIconName.dark',
    name: AppIcons.Dark,
  },
  {
    title: 'appIconName.calculator',
    name: AppIcons.Calculator,
    needsBuy: true,
  },
  {
    title: 'appIconName.passwordBox',
    name: AppIcons.PasswordBox,
    needsBuy: true,
  },
  {
    title: 'appIconName.clock',
    name: AppIcons.Clock,
    needsBuy: true,
  },
  {
    title: 'appIconName.housekeeper',
    name: AppIcons.Housekeeper,
    needsBuy: true,
  },
  {
    title: 'appIconName.todo',
    name: AppIcons.Todo,
    needsBuy: true,
  },
];
