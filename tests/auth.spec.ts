import { test } from '@playwright/test';
import { SignUp } from './SignUp';

test("Sign up Alice", async ({ page }) => {
    const signUp = new SignUp(page)

    await page.goto('http://localhost:5173/');
    await signUp.navigate()
    await signUp.fillAndSignUp()
  });