import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export function openLinkInAppBrowser(url: string, preferredControlTintColor?: string) {
  InAppBrowser.open(encodeURI(url), {
    dismissButtonStyle: 'close',
    preferredControlTintColor,
    modalEnabled: false,
    animated: true,
    enableBarCollapsing: true,
  });
}
