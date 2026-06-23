import { test, expect } from '@playwright/test';

test('Verify Text Input Field', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await page.getByRole('textbox', { name: 'Text input' }).click();
  await page.getByRole('textbox', { name: 'Text input' }).fill('testing');
  await expect(page.getByRole('textbox', { name: 'Text input' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Text input' })).toHaveValue('testing');
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text: Text input
    - textbox "Text input": testing
    `);
  console.log('✅ text input verified successfully');
});