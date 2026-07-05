import { expect, test } from '@playwright/test';

test('(N) Verify date picker accepts invalid text without normalization', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const datePicker = page.getByLabel('Date picker');

  await datePicker.fill('not-a-date');

  await expect(datePicker).toHaveValue('not-a-date');
  await expect(datePicker).not.toHaveValue('2026-07-05');
});
