import { normalize } from './normalize';
import { assertPath } from './utils';

export function join(...paths: string[]) {
  if (paths.length === 0) return '.';
  let joined: string | undefined;
  for (let i = 0; i < paths.length; ++i) {
    const arg = paths[i];
    assertPath(arg);
    if (arg.length > 0) {
      if (joined === undefined) joined = arg;
      else joined += '/' + arg;
    }
  }
  if (joined === undefined) return '.';
  return normalize(joined);
}
