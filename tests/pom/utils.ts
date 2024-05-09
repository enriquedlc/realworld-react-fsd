import { Page } from '@playwright/test';
import { SignUp } from '../SignUp';
import { SignIn } from '../SignIn';
import { ALICE } from '../fixtures/users';

export async function loginOrSignUp(
  page: Page,
  { name = ALICE.name, email = ALICE.email } = {},
) {
  const signUp = new SignUp(page);
  const signIn = new SignIn(page);

  await page.goto('http://localhost:5173');

  try {
    await page
      .getByRole('button', { name: 'Your Feed' })
      .waitFor({ timeout: 300 });
  } catch (error) {
    await signIn.navigate();
    try {
      await signIn.signIn({ email });
    } catch (error) {
      await signUp.navigate();
      await signUp.signUp({
        name,
        email,
      });
    }
  }
}
