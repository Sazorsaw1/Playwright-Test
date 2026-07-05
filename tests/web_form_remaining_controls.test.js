import { expect, test } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const formUrl = 'https://www.selenium.dev/selenium/web/web-form.html';
const uploadFile = fileURLToPath(new URL('./fixtures/upload-sample.txt', import.meta.url));

test.describe('Selenium web form remaining controls', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(formUrl);
  });

  test('Verify textarea accepts multiple lines', async ({ page }) => {
    const textarea = page.getByLabel('Textarea');
    const message = ['first line', 'second line'].join('\n');

    await textarea.fill(message);

    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveValue(message);
  });

  test('Verify datalist accepts a suggested option', async ({ page }) => {
    const datalist = page.getByLabel('Dropdown (datalist)');

    await datalist.fill('San Francisco');

    await expect(datalist).toBeVisible();
    await expect(datalist).toHaveValue('San Francisco');
  });

  test('Verify file input accepts an uploaded file', async ({ page }) => {
    const fileInput = page.getByLabel('File input');

    await fileInput.setInputFiles(uploadFile);

    await expect(fileInput).toHaveValue(new RegExp(`${path.basename(uploadFile)}$`));
  });

  test('Verify checkbox states can be changed', async ({ page }) => {
    const checkedCheckbox = page.getByLabel('Checked checkbox');
    const defaultCheckbox = page.getByLabel('Default checkbox');

    await expect(checkedCheckbox).toBeChecked();
    await expect(defaultCheckbox).not.toBeChecked();

    await checkedCheckbox.uncheck();
    await defaultCheckbox.check();

    await expect(checkedCheckbox).not.toBeChecked();
    await expect(defaultCheckbox).toBeChecked();
  });

  test('Verify radio button selection changes within the group', async ({ page }) => {
    const checkedRadio = page.getByLabel('Checked radio');
    const defaultRadio = page.getByLabel('Default radio');

    await expect(checkedRadio).toBeChecked();
    await expect(defaultRadio).not.toBeChecked();

    await defaultRadio.check();

    await expect(defaultRadio).toBeChecked();
    await expect(checkedRadio).not.toBeChecked();
  });

  test('Verify color, date, and range controls accept values', async ({ page }) => {
    const colorPicker = page.getByLabel('Color picker');
    const datePicker = page.getByLabel('Date picker');
    const range = page.getByLabel('Example range');

    await colorPicker.fill('#00ff00');
    await datePicker.fill('2026-07-05');
    await range.fill('8');

    await expect(colorPicker).toHaveValue('#00ff00');
    await expect(datePicker).toHaveValue('2026-07-05');
    await expect(range).toHaveValue('8');
  });

  test('Verify submitting the form opens the confirmation page', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/submitted-form\.html/);
    await expect(page.getByRole('heading', { name: 'Form submitted' })).toBeVisible();
    await expect(page.getByText('Received!')).toBeVisible();
  });
});
