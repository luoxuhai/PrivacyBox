import { assertPath } from './utils';

export function parse(path?: string) {
  assertPath(path);

  const ret = { root: '', dir: '', base: '', ext: '', name: '' };
  if (path.length === 0) return ret;
  let code = path.charCodeAt(0);
  const isAbsolute = code === 47; /* / */
  let start;
  if (isAbsolute) {
    ret.root = '/';
    start = 1;
  } else {
    start = 0;
  }
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1;

  let preDotState = 0;

  for (; i >= start; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /* / */) {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /* . */) {
      if (startDot === -1) startDot = i;
      else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }

  if (
    startDot === -1 ||
    end === -1 ||
    preDotState === 0 ||
    (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
  ) {
    if (end !== -1) {
      if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);
      else ret.base = ret.name = path.slice(startPart, end);
    }
  } else {
    if (startPart === 0 && isAbsolute) {
      ret.name = path.slice(1, startDot);
      ret.base = path.slice(1, end);
    } else {
      ret.name = path.slice(startPart, startDot);
      ret.base = path.slice(startPart, end);
    }
    ret.ext = path.slice(startDot, end);
  }

  if (startPart > 0) ret.dir = path.slice(0, startPart - 1);
  else if (isAbsolute) ret.dir = '/';

  return ret;
}
