import { test } from '@playwright/test';

import { loginOrSignUp } from './pom/utils';

test('Sign up Alice', async ({ page }) => {
  await loginOrSignUp(page);
});
