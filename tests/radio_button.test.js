import { expect, test } from '@playwright/test';

test('Verify radio button selection changes within the group', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const checkedRadio = page.getByLabel('Checked radio');
  const defaultRadio = page.getByLabel('Default radio');

  await expect(checkedRadio).toBeChecked();
  await expect(defaultRadio).not.toBeChecked();

  await defaultRadio.check();

  await expect(defaultRadio).toBeChecked();
  await expect(checkedRadio).not.toBeChecked();
});
