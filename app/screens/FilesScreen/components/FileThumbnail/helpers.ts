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

export function getCoverComponent(isFolder: boolean, mime: string, extensionName?: string) {
  if (isFolder) return CoverFolder;

  if (extensionName === 'pdf') {
    return CoverPDF;
  } else if (WebExtensionNames.includes(extensionName as string)) {
    return CoverWeb;
  } else if (mime?.startsWith('text/') || TextExtensionNames.includes(extensionName as string)) {
    return CoverTXT;
  } else if (ArchiveExtensionNames.includes(extensionName as string)) {
    return CoverZip;
  } else if (WordExtensionNames.includes(extensionName as string)) {
    return CoverWord;
  } else if (PPTExtensionNames.includes(extensionName as string)) {
    return CoverPPT;
  } else if (ExcelExtensionNames.includes(extensionName as string)) {
    return CoverExcel;
  } else if (mime?.startsWith('image/') || ImageExtensionNames.includes(extensionName as string)) {
    return CoverImage;
  } else if (mime?.startsWith('audio/') || AudioExtensionNames.includes(extensionName as string)) {
    return CoverAudio;
  } else if (mime?.startsWith('video/') || VideoExtensionNames.includes(extensionName as string)) {
    return CoverVideo;
  } else {
    return CoverOther;
  }
}
