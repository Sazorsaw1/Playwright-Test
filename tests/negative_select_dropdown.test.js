import { expect, test } from '@playwright/test';

test('(N) Verify select dropdown rejects an unknown option', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const selectDropdown = page.getByLabel('Dropdown (select) Open this');

  await expect(selectDropdown.selectOption('invalid-option', { timeout: 1000 })).rejects.toThrow();
  await expect(selectDropdown).toHaveValue('Open this select menu');
});
