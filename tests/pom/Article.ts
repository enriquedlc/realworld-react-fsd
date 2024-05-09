import { expect, Page } from '@playwright/test';
import { CARBON_EMISSIONS_ARTICLE } from '../fixtures/articles';
import { comment } from '../comment';

export class Article {
  constructor(private readonly page: Page) {}

  async expectToBeVisible({
    title = CARBON_EMISSIONS_ARTICLE.title,
    body = CARBON_EMISSIONS_ARTICLE.body,
  } = {}) {
    await expect(this.page.getByText(title)).toBeVisible();
    await expect(this.page.getByText(body)).toBeVisible();
  }

  async delete() {
    await this.page
      .getByRole('button', { name: /Delete Article/i })
      .first()
      .click();

    await this.page.waitForURL('/');
  }

  async writeComment({ body = comment.body } = {}) {
    await this.getCommentInput().fill(body);
    await this.postComment();
  }

  private async postComment() {
    await this.page.getByRole('button', { name: /Post Comment/i }).click();
  }

  private getCommentInput() {
    return this.page.getByPlaceholder(/Write a comment/);
  }
}
