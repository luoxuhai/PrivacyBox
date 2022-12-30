import { assertPath } from './utils';

export function isAbsolute(path?: string) {
  assertPath(path);
  return path.length > 0 && path.charCodeAt(0) === 47;
}
