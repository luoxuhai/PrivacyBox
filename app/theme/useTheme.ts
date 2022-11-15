import { useStores } from '@/models/helpers/useStores';

export function useTheme() {
  const { themeStore } = useStores();

  return {
    colors: themeStore.colors,
    appearance: themeStore.appearance,
    isDark: themeStore.isDark,
    appIcon: themeStore.appIcon,
    setAppearance: themeStore.setAppearance,
    setAppIcon: themeStore.setAppIcon,
  };
}
