import { expect, test } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const uploadFile = fileURLToPath(new URL('./fixtures/upload-sample.txt', import.meta.url));

test('Verify file input accepts an uploaded file', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const fileInput = page.getByLabel('File input');

  await fileInput.setInputFiles(uploadFile);

  await expect(fileInput).toHaveValue(new RegExp(`${path.basename(uploadFile)}$`));
});
