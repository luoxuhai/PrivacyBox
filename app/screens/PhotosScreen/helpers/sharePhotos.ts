import Share from 'react-native-share';

export async function sharePhotos({ uri, uris }: { uri?: string; uris?: string[] }) {
  const _uris = uri ? [uri] : uris ?? [];

  try {
    await Share.open({
      urls: _uris,
    });
  } catch (error) {
    console.error(error);
  }
}
