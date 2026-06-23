import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');
  await page.getByLabel('Dropdown (select) Open this').selectOption('1');
  await expect(page.getByLabel('Dropdown (select) Open this')).toBeVisible();
  await expect(page.getByLabel('Dropdown (select) Open this')).toContainText('One');
  await expect(page.getByLabel('Dropdown (select) Open this')).toHaveValue('1');
  await expect(page.locator('form')).toMatchAriaSnapshot(`
    - text: Dropdown (select)
    - combobox "Dropdown (select)":
      - option "Open this select menu"
      - option "One" [selected]
      - option "Two"
      - option "Three"
    `);
 console.log('✅ disabled input verified successfully');
});