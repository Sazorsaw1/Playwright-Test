import { expect, test } from '@playwright/test';

test('Verify color, date, and range controls accept values', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const colorPicker = page.getByLabel('Color picker');
  const datePicker = page.getByLabel('Date picker');
  const range = page.getByLabel('Example range');

  await colorPicker.fill('#00ff00');
  await datePicker.fill('2026-07-05');
  await range.fill('8');

  await expect(colorPicker).toHaveValue('#00ff00');
  await expect(datePicker).toHaveValue('2026-07-05');
  await expect(range).toHaveValue('8');
});
