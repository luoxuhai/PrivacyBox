import { assertPath, normalizeStringPosix } from './utils';

export function normalize(path?: string) {
  assertPath(path);

  if (path.length === 0) return '.';

  const isAbsolute = path.charCodeAt(0) === 47; /* / */
  const trailingSeparator = path.charCodeAt(path.length - 1) === 47; /* / */

  path = normalizeStringPosix(path, !isAbsolute);

  if (path.length === 0 && !isAbsolute) path = '.';
  if (path.length > 0 && trailingSeparator) path += '/';

  if (isAbsolute) return '/' + path;
  return path;
}
