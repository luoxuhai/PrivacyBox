import {
  CoverFolder,
  CoverImage,
  CoverAudio,
  CoverVideo,
  CoverOther,
  CoverWord,
  CoverPDF,
  CoverExcel,
  CoverTXT,
  CoverPPT,
  CoverWeb,
  CoverZip,
} from './icons';
import {
  PPTExtensionNames,
  ExcelExtensionNames,
  WordExtensionNames,
  ArchiveExtensionNames,
  TextExtensionNames,
  WebExtensionNames,
  ImageExtensionNames,
  AudioExtensionNames,
  VideoExtensionNames,
} from './constants';
import * as path from '@/lib/path';

export function getCoverComponent(isFolder: boolean, mime: string, filename?: string) {
  if (isFolder) return CoverFolder;

  const extname = path.extname(filename, true);

  if (extname === 'pdf') {
    return CoverPDF;
  } else if (WebExtensionNames.includes(extname as string)) {
    return CoverWeb;
  } else if (mime?.startsWith('text/') || TextExtensionNames.includes(extname as string)) {
    return CoverTXT;
  } else if (ArchiveExtensionNames.includes(extname as string)) {
    return CoverZip;
  } else if (WordExtensionNames.includes(extname as string)) {
    return CoverWord;
  } else if (PPTExtensionNames.includes(extname as string)) {
    return CoverPPT;
  } else if (ExcelExtensionNames.includes(extname as string)) {
    return CoverExcel;
  } else if (mime?.startsWith('image/') || ImageExtensionNames.includes(extname as string)) {
    return CoverImage;
  } else if (mime?.startsWith('audio/') || AudioExtensionNames.includes(extname as string)) {
    return CoverAudio;
  } else if (mime?.startsWith('video/') || VideoExtensionNames.includes(extname as string)) {
    return CoverVideo;
  } else {
    return CoverOther;
  }
}
