import { test, expect } from '@playwright/test';

test('Verify Input Password in Password box', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('password box');

  console.log('✅ password input verified successfully');
});