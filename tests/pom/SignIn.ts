import { Page } from '@playwright/test';
import { ALICE } from '../fixtures/users'

export class SignIn {
    constructor(private readonly page: Page) {}
  
    async navigate({ url = 'http://localhost:5173/login' } = {}) {
      await this.page.goto(url);
    }
  
    async fillAndSignIn({
      email = ALICE.email,
      password = ALICE.password,
    } = {}) {
      await this.page.getByPlaceholder('Email').fill(email);
      await this.page.getByPlaceholder('Password').fill(password);
      await this.page.getByRole('button', { name: /Sign in/i }).click();
      await this.page.waitForURL(/profile/i);
    }
  }