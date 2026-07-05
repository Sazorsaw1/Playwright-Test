import { expect, test } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const formUrl = 'https://www.selenium.dev/selenium/web/web-form.html';
const uploadFile = fileURLToPath(new URL('./fixtures/upload-sample.txt', import.meta.url));
const missingUploadFile = fileURLToPath(new URL('./fixtures/missing-upload.txt', import.meta.url));

test.describe('Selenium web form end-to-end coverage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(formUrl);
  });

  test('Verify text input accepts a value', async ({ page }) => {
    const textInput = page.getByRole('textbox', { name: 'Text input' });

    await textInput.fill('testing');

    await expect(textInput).toBeVisible();
    await expect(textInput).toHaveValue('testing');
  });

  test('Verify password input accepts a value', async ({ page }) => {
    const passwordInput = page.getByRole('textbox', { name: 'Password' });

    await passwordInput.fill('password box');

    await expect(passwordInput).toHaveValue('password box');
  });

  test('Verify disabled input cannot be edited', async ({ page }) => {
    const disabledInput = page.getByRole('textbox', { name: 'Disabled input' });

    await expect(disabledInput).toBeDisabled();
    await expect(disabledInput).toBeEmpty();
  });

  test('Verify readonly input keeps its default value', async ({ page }) => {
    const readonlyInput = page.getByRole('textbox', { name: 'Readonly input' });

    await expect(readonlyInput).toHaveAttribute('readonly', '');
    await expect(readonlyInput).toHaveValue('Readonly input');
  });

  test('Verify select dropdown chooses an option', async ({ page }) => {
    const selectDropdown = page.getByLabel('Dropdown (select) Open this');

    await selectDropdown.selectOption('1');

    await expect(selectDropdown).toBeVisible();
    await expect(selectDropdown).toContainText('One');
    await expect(selectDropdown).toHaveValue('1');
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

  test('Complete web form end-to-end flow', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Text input' }).fill('testing');
    await page.getByRole('textbox', { name: 'Password' }).fill('password box');
    await page.getByLabel('Textarea').fill(['first line', 'second line'].join('\n'));
    await page.getByLabel('Dropdown (select) Open this').selectOption('1');
    await page.getByLabel('Dropdown (datalist)').fill('San Francisco');
    await page.getByLabel('File input').setInputFiles(uploadFile);
    await page.getByLabel('Checked checkbox').uncheck();
    await page.getByLabel('Default checkbox').check();
    await page.getByLabel('Default radio').check();
    await page.getByLabel('Color picker').fill('#00ff00');
    await page.getByLabel('Date picker').fill('2026-07-05');
    await page.getByLabel('Example range').fill('8');

    await expect(page.getByRole('textbox', { name: 'Text input' })).toHaveValue('testing');
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('password box');
    await expect(page.getByLabel('File input')).toHaveValue(new RegExp(`${path.basename(uploadFile)}$`));

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page).toHaveURL(/submitted-form\.html/);
    await expect(page.getByRole('heading', { name: 'Form submitted' })).toBeVisible();
    await expect(page.getByText('Received!')).toBeVisible();
  });

  test('(N) Verify select dropdown rejects an unknown option', async ({ page }) => {
    const selectDropdown = page.getByLabel('Dropdown (select) Open this');

    await expect(selectDropdown.selectOption('invalid-option', { timeout: 1000 })).rejects.toThrow();
    await expect(selectDropdown).toHaveValue('Open this select menu');
  });

  test('(N) Verify color picker rejects an invalid color value', async ({ page }) => {
    const colorPicker = page.getByLabel('Color picker');

    await expect(colorPicker.fill('not-a-color')).rejects.toThrow();
    await expect(colorPicker).not.toHaveValue('not-a-color');
  });

  test('(N) Verify date picker accepts invalid text without normalization', async ({ page }) => {
    const datePicker = page.getByLabel('Date picker');

    await datePicker.fill('not-a-date');

    await expect(datePicker).toHaveValue('not-a-date');
    await expect(datePicker).not.toHaveValue('2026-07-05');
  });

  test('(N) Verify file input rejects a missing file', async ({ page }) => {
    const fileInput = page.getByLabel('File input');

    await expect(fileInput.setInputFiles(missingUploadFile)).rejects.toThrow();
    await expect(fileInput).toHaveValue('');
  });
});
