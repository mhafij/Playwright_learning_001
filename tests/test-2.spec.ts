import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://192.168.11.9:8001/signin');
  await page.locator('input[name="userName"]').click();
  await page.locator('input[name="userName"]').fill('user1');
  await page.locator('input[name="userName"]').press('Tab');
  await page.locator('input[name="password"]').fill('1235');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByLabel('Invalid User or Password.')).toContainText('Invalid User or Password. Please provide valid credential.');
});