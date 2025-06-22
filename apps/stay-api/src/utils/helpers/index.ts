import * as bcrypt from 'bcrypt';
import { readFileSync } from 'fs';
import slug from 'slugify';
import { formatDate } from './formatter';
import { IPaginationReq } from '@/types';
export * from './formatter';
export * from './regex';

/**
 * compare input password during login
 * @param orgPassword
 * @param encryptedPassword
 * @returns
 */
export function comparePassword(orgPassword: string, encryptedPassword: string) {
  const isPassword = bcrypt.compareSync(orgPassword, encryptedPassword);
  return isPassword;
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

/**
 *
 * @param path
 * @returns
 */
export function readJsonFile<T = unknown>(path: string) {
  try {
    const file = readFileSync(path, 'utf8');
    return JSON.parse(file) as T;
  } catch (error) {
    return null;
  }
}

export type OptionStrGenerate = {
  length?: number;
  prefix?: string;
  suffix?: string;
  upCase?: boolean;
  lowerCase?: boolean;
};

/**
 *
 * @param options
 * @returns string
 */
export const strGenerate = (options?: OptionStrGenerate): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < (options?.length || 10); i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (options?.prefix) {
    result = `${options?.prefix}${result}`;
  }
  if (options?.suffix) {
    result = `${result}${options?.suffix}`;
  }
  if (options?.upCase && !options?.lowerCase) {
    result = result.toUpperCase();
  }
  if (options?.lowerCase && !options?.upCase) {
    result = result.toLowerCase();
  }
  return result;
};

/**
 *
 * @param name
 * @returns string
 */
export const genSlug = (name?: string) => {
  return slug(name || strGenerate({ length: 10, lowerCase: true }));
};

/**
 *
 * @param name
 * @returns string
 */
export const genFileName = (name?: string) => {
  return `${formatDate(new Date())}-${slug(name || strGenerate({ length: 10, lowerCase: true }))}`;
};

/**
 *
 * @param content
 * @returns
 */
export const calculateReadingTime = (content: string) => {
  if (!content || content.length <= 0) return 0;

  // Assuming an average reading speed of 200 words per minute
  const wordsPerMinute = 200;

  // Count the number of words in the content
  const wordCount = content.split(/\s+/).length;

  // Calculate the estimated reading time in minutes
  const readingTimeInMinutes = Math.ceil(wordCount / wordsPerMinute);

  return readingTimeInMinutes;
};

/**
 *
 * @param count
 * @param pagination
 * @returns
 */
export const resPagination = (count: number, pagination: IPaginationReq) => {
  const totalPages = Math.ceil(count / (pagination?.pageSize ?? 10));
  return {
    totalPages,
    count,
  };
};
