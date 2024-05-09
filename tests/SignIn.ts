import { Page } from '@playwright/test';
import { ALICE } from './fixtures/users';

export class SignIn {
  constructor(private readonly page: Page) {}

  async navigate() {
    await this.page.goto('http://localhost:5173/login');
  }

  async signIn({ email = ALICE.email, password = ALICE.password } = {}) {
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.page.waitForURL(/profile/i, { timeout: 300 });
  }
}
