import { join } from '@/lib/path';
import { SOURCE_PATH } from '../constants';

/**
 * 获取资源文件地址
 *
 * @param sourceId
 * @param filename
 * @returns 本地路径
 */
export function getSourceUri(sourceId: string, filename?: string): string {
  return join(SOURCE_PATH, sourceId, filename);
}

/**
 * 获取资源文件地址
 *
 * @param sourceId
 * @param filename
 * @returns 本地路径
 */
export function getSourceDir(sourceId: string): string {
  return join(SOURCE_PATH, sourceId);
}
