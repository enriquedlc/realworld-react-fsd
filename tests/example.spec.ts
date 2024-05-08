import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // go to localhost:8123
  await page.goto('http://localhost:8123');

  // Seleccionar el segundo botón "Continue" por su posición
  const button = await page
    .getByRole('button', {
      name: 'Continue',
    })
    .click();

  console.log(button);

  await expect(page).toHaveTitle('conduit');
});
