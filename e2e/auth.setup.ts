import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Navigate to the application and login
  await loginPage.goto();
  await loginPage.login('sahan.amarsha+test2@rootcode.io', 'Test@123');
  
  // Wait for successful login and navigation to dashboard
  await loginPage.verifyLoginSuccess();
  
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
