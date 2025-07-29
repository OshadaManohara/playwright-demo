import { test as setup, expect } from '@playwright/test';

const authFile = 'tests/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps
  await page.goto('http://localhost:3000');
  
  // Fill login form
  await page.getByTestId('email-input').fill('sahan.amarsha@rootcode.io');
  await page.getByTestId('password-input').fill('Sahan@123');
  await page.getByTestId('login-submit-button').click();
  
  // Wait for successful login
  await page.waitForURL('**/dashboard');
  
  // Verify we're logged in by checking for dashboard elements
  await expect(page.getByText('Admin')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  
  // Save signed-in state to 'tests/.auth/user.json'
  await page.context().storageState({ path: authFile });
});
