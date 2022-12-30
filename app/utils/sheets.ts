import { registerSheet } from 'react-native-actions-sheet';

import { FileImporterSheet } from '@/screens/FilesScreen/components/FileImporterSheet';
import { FileDetailSheet } from '@/screens/FilesScreen/components/FileDetailSheet';

registerSheet('file-importer-sheet', FileImporterSheet);
registerSheet('file-detail-sheet', FileDetailSheet);
