import { Page } from '@playwright/test';
import { CARBON_EMISSIONS_ARTICLE } from '../fixtures/articles';

export class NewArticle {
  constructor(private readonly page: Page) {}

  async navigate() {
    await this.page.goto('/editor');
  }

  async create() {
    await this.page
      .getByPlaceholder('Article Title')
      .fill(CARBON_EMISSIONS_ARTICLE.title);
    await this.page
      .getByPlaceholder("What's this article about?")
      .fill(CARBON_EMISSIONS_ARTICLE.description);
    await this.page
      .getByPlaceholder('Write your article (in')
      .fill(CARBON_EMISSIONS_ARTICLE.body);
    await this.page
      .getByPlaceholder('Enter tags')
      .fill(CARBON_EMISSIONS_ARTICLE.tags);
    await this.page.getByRole('button', { name: 'Publish Article' }).click();
    await this.page.waitForURL(/article\/.*/i);
  }
}
