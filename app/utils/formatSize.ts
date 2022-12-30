export function formatSize(size = 0 as number | string, n = 1): string {
  const len = Number(size) / 1024;
  if (len > 1000) {
    return formatSize(len, ++n);
  } else {
    switch (n) {
      case 1:
        return len.toFixed(2) + 'KB';
      case 2:
        return len.toFixed(2) + 'MB';
      case 3:
        return len.toFixed(2) + 'GB';
      case 4:
        return len.toFixed(2) + 'TB';
      default:
        return String(size);
    }
  }
}
