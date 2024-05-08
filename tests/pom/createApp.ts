import { Page, expect } from '@playwright/test';
import {Article} from '../Article'

export function createApp(page: Page) {
  const article = new Article(page);

  return {
    article,
    reload: () => page.reload(),
    async expectToSee(text: string) {
      await expect(page.getByText(text)).toBeVisible();
    },
  };
}