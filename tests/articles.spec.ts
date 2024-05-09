import { test } from '@playwright/test';
import { Article } from './pom/Article';
import { loginOrSignUp } from './pom/utils';
import { NewArticle } from './pom/NewArticle';

test('write article', async ({ page }) => {
  const article = new Article(page);
  const newArticle = new NewArticle(page);

  await loginOrSignUp(page);

  await newArticle.navigate();
  await newArticle.create();

  await article.expectToBeVisible();
});
