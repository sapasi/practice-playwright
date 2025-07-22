import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.webdriveruniversity.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'BUTTON CLICKS WebElement' }).click();
  const page1 = await page1Promise;
  await page1.getByText('CLICK ME!', { exact: true }).click();
  await page1.getByRole('button', { name: 'Close' }).click();
  await page1.getByText('CLICK ME!', { exact: true }).click();
  await page1.getByRole('button', { name: '×' }).click();
});