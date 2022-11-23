import * as Burnt from 'burnt';
import { HapticFeedback } from './HapticFeedback';

type ToastOptions = {
  title: string;
  message?: string;
  preset: 'done' | 'error'; // TODO custom option
  /**
   * Duration in seconds.
   */
  duration?: number;
  haptic?: 'success' | 'warning' | 'error' | 'none';
  /**
   * Defaults to `true`.
   */
  shouldDismissByDrag?: boolean;
};

function toast(options: ToastOptions) {
  Burnt.toast({
    duration: 2,
    ...options,
    message: options.message ?? '',
    haptic: HapticFeedback.enabled ? options.haptic ?? 'none' : 'none',
  });
}

function dismissAllAlerts() {
  Burnt.dismissAllAlerts();
}

export const Overlay = { toast, dismissAllAlerts };
