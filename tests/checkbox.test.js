import { expect, test } from '@playwright/test';

test('Verify checkbox states can be changed', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const checkedCheckbox = page.getByLabel('Checked checkbox');
  const defaultCheckbox = page.getByLabel('Default checkbox');

  await expect(checkedCheckbox).toBeChecked();
  await expect(defaultCheckbox).not.toBeChecked();

  await checkedCheckbox.uncheck();
  await defaultCheckbox.check();

  await expect(checkedCheckbox).not.toBeChecked();
  await expect(defaultCheckbox).toBeChecked();
});
