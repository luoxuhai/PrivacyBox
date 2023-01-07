import { registerSheet } from 'react-native-actions-sheet';

import { FileImporterSheet } from '@/screens/FilesScreen/components/FileImporterSheet';
import { FileDetailSheet } from '@/screens/FilesScreen/components/FileDetailSheet';
import { PhotoDetailSheet } from '@/screens/PhotosScreen/components/PhotoDetailSheet';
import { PhotoImporterSheet } from '@/screens/PhotosScreen/components/PhotoImporterSheet';
import { AlbumPickerSheet } from '@/screens/AlbumsScreen/components/AlbumPickerSheet';

registerSheet('file-importer-sheet', FileImporterSheet);
registerSheet('file-detail-sheet', FileDetailSheet);
registerSheet('photo-detail-sheet', PhotoDetailSheet);
registerSheet('photo-importer-sheet', PhotoImporterSheet);
registerSheet('album-picker-sheet', AlbumPickerSheet);
