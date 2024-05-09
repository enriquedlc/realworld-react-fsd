import { test } from './fixtures/test';
import {Article} from './Article'
import { CARBON_EMISSIONS } from './articles';
import { loginOrSignup } from './loginOrSignup';

test("write article", async ({ page }) => {
    const article = new Article(page)
    
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: /New Article/i }).click();
    await page.getByPlaceholder(/Article Title/).fill(CARBON_EMISSIONS.title)
    await page.getByPlaceholder(/What's this article about?/).fill(CARBON_EMISSIONS.description)
    await page.getByPlaceholder(/Write your article/).fill(CARBON_EMISSIONS.body)
    await page.getByPlaceholder(/Enter tags/).fill(CARBON_EMISSIONS.tags)
    await page.getByRole('button', { name: /Publish Article/i }).click();

    await article.expectToBeVisible()
  });