import { expect, test } from '@playwright/test';

test('Verify datalist accepts a suggested option', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const datalist = page.getByLabel('Dropdown (datalist)');

  await datalist.fill('San Francisco');

  await expect(datalist).toBeVisible();
  await expect(datalist).toHaveValue('San Francisco');
});
