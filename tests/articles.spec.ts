import { test } from './fixtures/test';
import { Article } from './pom/Article';
import { NewArticle } from './pom/NewArticle';

test('write article', async ({ page }) => {
  const article = new Article(page);
  const newArticle = new NewArticle(page);

  await newArticle.navigate();
  await newArticle.create();

  await article.expectToBeVisible();
});
