import { test as setup, expect } from '@playwright/test';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Navigate to the application
  await page.goto('http://localhost:3001');
  
  // Login with provided credentials
  await page.getByTestId('email-input').fill('sahan.amarsha+test2@rootcode.io');
  await page.getByTestId('password-input').fill('Test@123');
  await page.getByTestId('login-submit-button').click();
  
  // Wait for successful login and navigation to dashboard
  await expect(page).toHaveURL(/.*\/dashboard/);
  
  // Ensure the user is logged in by checking for user-specific content
  await expect(page.getByText('Admin')).toBeVisible();
  
  // Save the authentication state to a file
  await page.context().storageState({ path: authFile });
});
