import { test } from './fixtures/test';
import { Article } from './pom/Article';
import { NewArticle } from './pom/NewArticle';

test('write article', async ({ page }) => {
  // todo: before deleting an article
  // go to / and view the global feed
  // then click on the article to view it
  // then delete it
  const article = new Article(page);
  const newArticle = new NewArticle(page);

  await newArticle.navigate();
  await newArticle.create();

  await page
    .getByRole('link', { name: 'The Impact of Renewable' })
    .first()
    .click();
  await page.getByRole('button', { name: 'Delete Article' }).first().click();
  await article.expectToBeVisible();
});
