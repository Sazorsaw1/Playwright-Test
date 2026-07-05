import { expect, test } from '@playwright/test';

test('(N) Verify color picker rejects an invalid color value', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const colorPicker = page.getByLabel('Color picker');

  await expect(colorPicker.fill('not-a-color')).rejects.toThrow();
  await expect(colorPicker).not.toHaveValue('not-a-color');
});
