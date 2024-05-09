import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { loginOrSignup } from '../loginOrSignup';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [async ({ browser }, use) => {
    const id = test.info().parallelIndex;
    const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

    if (fs.existsSync(fileName)) {
      await use(fileName);
      return;
    }

    const page = await browser.newPage({ storageState: undefined });

    await loginOrSignup(page,{name: `ALICE ${id}`, email: `alice_${id}@example.com`})

    await page.context().storageState({ path: fileName });
    await page.close();
    await use(fileName);
  }, { scope: 'worker' }],
});