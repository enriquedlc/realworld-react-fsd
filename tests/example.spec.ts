import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // go to localhost:8123
  await page.goto('http://localhost:5173');

  await expect(page).toHaveTitle(/conduit/i);
});
