import { FileImporter } from '../../FilesScreen/helpers/FileImporter';

export class PhotoImporter extends FileImporter {
  public static download = {
    open() {
      console.log('download');
    },
  };
}
