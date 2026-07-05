import { expect, test } from '@playwright/test';

test('(N) Verify readonly input rejects editing', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const readonlyInput = page.getByRole('textbox', { name: 'Readonly input' });

  await expect(readonlyInput).toHaveValue('Readonly input');
  await expect(readonlyInput.fill('changed value', { timeout: 1000 })).rejects.toThrow();
  await expect(readonlyInput).toHaveValue('Readonly input');
});
