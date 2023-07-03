import { Mixpanel, MixpanelProperties } from 'mixpanel-react-native';

import { Application } from './application';

export class EventTracking {
  public static shared = new EventTracking();
  private mixpanel?: Mixpanel;

  get disabled() {
    return Application.env !== 'AppStore';
  }

  constructor() {
    if (this.disabled) {
      return;
    }

    this.mixpanel = new Mixpanel('09077b0b7477f0b9a568af017d4d529f', true);
    this.mixpanel.init();
  }

  public track(eventName: string, properties?: MixpanelProperties | undefined) {
    this.mixpanel?.track(eventName, properties);
  }
}
