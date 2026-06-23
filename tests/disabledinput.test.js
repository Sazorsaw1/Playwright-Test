import { test, expect } from '@playwright/test';

test('Verify Disabled Input Box', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await expect(page.getByRole('textbox', { name: 'Disabled input' })).toBeEmpty();

  console.log('✅ disabled input verified successfully');
});