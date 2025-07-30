import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps
  await page.goto('http://localhost:3000');
  
  // Login with test credentials
  await page.getByRole('textbox', { name: 'Email' }).fill('sahan.amarsha+test1@rootcode.io');
  await page.getByRole('textbox', { name: 'Password' }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  // Wait for successful login and dashboard to load
  await page.waitForURL('**/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  
  // End of authentication steps
  await page.context().storageState({ path: authFile });
});
