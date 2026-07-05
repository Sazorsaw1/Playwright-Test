import { expect, test } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const missingUploadFile = fileURLToPath(new URL('./fixtures/missing-upload.txt', import.meta.url));

test('(N) Verify file input rejects a missing file', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const fileInput = page.getByLabel('File input');

  await expect(fileInput.setInputFiles(missingUploadFile)).rejects.toThrow();
  await expect(fileInput).toHaveValue('');
});
