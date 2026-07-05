import { expect, test } from '@playwright/test';

test('(N) Verify disabled input rejects typing', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const disabledInput = page.getByRole('textbox', { name: 'Disabled input' });

  await expect(disabledInput).toBeDisabled();
  await expect(disabledInput.fill('blocked value', { timeout: 1000 })).rejects.toThrow();
  await expect(disabledInput).toBeEmpty();
});
