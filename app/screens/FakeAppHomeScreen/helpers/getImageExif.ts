import { getAssetInfoAsync } from 'expo-media-library';

export async function getImageExif(id: string) {
  const { exif } = await getAssetInfoAsync(id);

  return exif;
}
