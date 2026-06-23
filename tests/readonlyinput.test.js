import { test, expect } from '@playwright/test';

test('Verify Read Only Box', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await expect(page.getByRole('textbox', { name: 'Readonly input' })).toHaveValue('Readonly input');

  console.log('✅ Readonly input verified successfully');
});