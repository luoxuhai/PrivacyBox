import { registerSheet } from 'react-native-actions-sheet';

import { FileImporterSheet } from '@/screens/FilesScreen/components/FileImporterSheet';
import { FileDetailSheet } from '@/screens/FilesScreen/components/FileDetailSheet';
import { PhotoImporterSheet } from '@/screens/PhotosScreen/components/PhotoImporterSheet';

registerSheet('file-importer-sheet', FileImporterSheet);
registerSheet('file-detail-sheet', FileDetailSheet);
registerSheet('photo-importer-sheet', PhotoImporterSheet);
