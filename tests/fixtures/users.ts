import fs from 'fs';
import { Browser } from '@playwright/test';
import { createApp } from '../pom/createApp';

export type User = {
  name: string;
  email: string;
  password: string;
  path: string;
};

async function createContext(
  browser: Browser,
  storageState: string,
  baseURL?: string,
) {
  let localstorage: string | undefined = undefined;

  if (fs.existsSync(storageState)) {
    localstorage = storageState;
  }

  const context = await browser.newContext({
    storageState: localstorage,
    ...(baseURL ? { baseURL } : {}),
  });
  const page = await context.newPage();
  return {
    ...createApp(page),
    page,
    context,
  };
}

export const ALICE = {
  name: 'Alice',
  email: 'alice@example.com',
  password: 'password',
  path: 'playwright/.auth/alice.json',
  instance: (browser: Browser, baseURL?: string) =>
    createContext(browser, ALICE.path, baseURL),
};

export const BOB = {
  name: 'Bob Mayer',
  email: 'bob@example.com',
  password: 'password',
  path: 'playwright/.auth/bob.json',
  instance: (browser: Browser, baseURL?: string) =>
    createContext(browser, BOB.path, baseURL),
};

export function userForIndex(id: string | number): typeof ALICE {
  const user: User = {
    name: `Person ${id}`,
    email: `person+${id}@example.com`,
    password: '123456789',
    path: `playwright/.auth/${id}.json`,
  };
  return {
    ...user,
    instance: (browser: Browser, baseURL?: string) =>
      createContext(browser, user.path, baseURL),
  };
}