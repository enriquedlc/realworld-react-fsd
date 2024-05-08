import { test } from '@playwright/test';
import {Article} from './Article'

test("write article", async ({ page }) => {
    const article = new Article(page)

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: /New Article/i }).click();

    article.expectToBeVisible()
  });