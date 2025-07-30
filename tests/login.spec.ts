import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage } from './pages';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Verify we're on the login page
    await loginPage.expectToBeVisible();

    // Perform login
    await loginPage.login('sahan.amarsha@rootcode.io', 'Sahan@123');

    // Verify successful login
    await loginPage.expectLoginSuccess();
    await dashboardPage.expectDashboardHeading();
    await dashboardPage.expectToBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Attempt login with invalid credentials
    await loginPage.login('invalid@email.com', 'wrongpassword');

    // Verify error state
    await loginPage.expectLoginError();
  });

  test('should navigate to signup page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Click the Sign Up link
    await loginPage.clickSignUp();

    // Verify navigation to signup page
    await expect(page).toHaveURL(/.*signup.*/);
  });

  test('should display GitHub login option', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.goto();

    // Verify GitHub login button is present
    await expect(loginPage.githubButton).toBeVisible();
  });
});
