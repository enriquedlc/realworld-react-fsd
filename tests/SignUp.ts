import { Page } from '@playwright/test';
import { ALICE } from './fixtures/users'

export class SignUp {
    constructor(private readonly page: Page) {}
  
    async navigate({ url = 'http://localhost:5173/register' } = {}) {
      await this.page.goto(url);
    }
  
    async fillAndSignUp({
      name = ALICE.name,
      email = ALICE.email,
      password = ALICE.password,
    } = {}) {
      await this.page.getByPlaceholder('Your Name').fill(name);
      await this.page.getByPlaceholder('Email').fill(email);
      await this.page.getByPlaceholder('Password').fill(password);
      await this.page.getByRole('button', { name: /Sign up/i }).click();
      await this.page.waitForURL(/profile/i);
    }
  }