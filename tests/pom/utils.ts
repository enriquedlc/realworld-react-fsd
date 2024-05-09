import { Page } from '@playwright/test';
import { SignUp } from '../SignUp';
import { SignIn } from '../SignIn';

export async function loginOrSignUp(page: Page) {
  const signUp = new SignUp(page);
  const signIn = new SignIn(page);

  await page.goto('/');

  try {
    await page
      .getByRole('button', { name: 'Your Feed' })
      .waitFor({ timeout: 300 });
  } catch (error) {
    await signIn.navigate();
    try {
      await signIn.signIn();
    } catch (error) {
      await signUp.navigate();
      await signUp.signUp();
    }
  }
}
