import * as Haptics from 'expo-haptics';
import { rootStore } from '@/models';

export class HapticFeedback {
  static get enabled() {
    return rootStore.settingsStore.hapticFeedback;
  }

  static impact = {
    light: (): any => {
      if (this.enabled) return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
    medium: (): any => {
      if (this.enabled) return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    },
    heavy: (): any => {
      if (this.enabled) return Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    },
  };

  static notification = {
    success: (): any => {
      if (this.enabled) return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    error: (): any => {
      if (this.enabled) return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    },
    warning: (): any => {
      if (this.enabled) return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    },
  };

  static selection(): Promise<void> | void {
    if (this.enabled) return Haptics.selectionAsync();
  }
}
