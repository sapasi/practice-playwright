import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.webdriveruniversity.com/To-Do-List/index.html');
  await page.getByText('Go to potion class').click();
  await page.getByRole('listitem').filter({ hasText: 'Go to potion class' }).locator('span').click();
});