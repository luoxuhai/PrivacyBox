import Share from 'react-native-share';

export function exportFailData(uris: string[]) {
  return Share.open({
    urls: uris.map((uri) => encodeURI(uri)),
    saveToFiles: true,
  });
}
