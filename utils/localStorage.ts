/* eslint-disable @typescript-eslint/no-explicit-any */

import { StorageKeys } from '~~/types/StorageKeys';

export const getStorage = <T = any>(key: StorageKeys, prop?: string): T | null => {
  const storage = localStorage.getItem(key);
  const parsedStorage: T | null = storage && JSON.parse(storage);

  if (!parsedStorage) {
    return null;
  }

  return prop ? (parsedStorage as any)[prop] : parsedStorage;
};

export const setStorage = <T = any>(key: StorageKeys, value: T, prop?: string) => {
  const currentStorage = getStorage(key);
  const updateStorage = prop
    ? { ...currentStorage, [prop]: value }
    : { ...currentStorage, ...value };

  const stringifyStorage = JSON.stringify(updateStorage);

  localStorage.setItem(key, stringifyStorage);

  return stringifyStorage;
};

export const clearStorage = (key: StorageKeys) => {
  localStorage.removeItem(key);
};
