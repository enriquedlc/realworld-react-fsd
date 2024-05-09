import { test } from '@playwright/test';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { ALICE } from './fixtures/users';

test('Sign up Alice', async ({ page }) => {
  const signUp = new SignUp(page);

  await page.goto('/');
  try {
    await page
      .getByRole('button', { name: 'Your Feed' })
      .waitFor({ timeout: 300 });
  } catch (error) {
    const signIn = new SignIn(page);
    await signIn.navigate();
    try {
      await signIn.signIn();
    } catch (error) {
      await signUp.navigate();
      await signUp.signUp();
    }
  }
});
