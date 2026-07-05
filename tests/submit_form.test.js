import { expect, test } from '@playwright/test';

test('Verify submitting the form opens the confirmation page', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page).toHaveURL(/submitted-form\.html/);
  await expect(page.getByRole('heading', { name: 'Form submitted' })).toBeVisible();
  await expect(page.getByText('Received!')).toBeVisible();
});
