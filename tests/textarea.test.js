import { expect, test } from '@playwright/test';

test('Verify textarea accepts multiple lines', async ({ page }) => {
  await page.goto('https://www.selenium.dev/selenium/web/web-form.html');

  const textarea = page.getByLabel('Textarea');
  const message = ['first line', 'second line'].join('\n');

  await textarea.fill(message);

  await expect(textarea).toBeVisible();
  await expect(textarea).toHaveValue(message);
});
