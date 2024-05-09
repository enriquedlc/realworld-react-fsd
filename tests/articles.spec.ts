import { test } from '@playwright/test';
import { Article } from './Article';

test('write article', async ({ page }) => {
  const article = new Article(page);

  await page.goto('/');
  await page.getByRole('link', { name: /New Article/i }).click();

  await article.expectToBeVisible();
});
