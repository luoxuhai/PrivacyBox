import { useStores } from '@/models/helpers/useStores';

export function useTheme() {
  const { themeStore } = useStores();

  return {
    colors: themeStore.colors,
    appearance: themeStore.appearance,
    isSystemAppearance: themeStore.isSystemAppearance,
    isDark: themeStore.isDark,
    appIcon: themeStore.appIcon,
    setAppearanceMode: themeStore.setAppearanceMode,
    setAppIcon: themeStore.setAppIcon,
  };
}
