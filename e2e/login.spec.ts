import { test, expect } from "@playwright/test";
import { LoginPage } from './pages/login.page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });

  test('should display login page elements correctly', async ({ page }) => {
    // Verify all login page elements are visible
    await loginPage.verifyLoginPageElements();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Test with invalid email and password
    await loginPage.login('pasindu.silva@rootcode.io', '2iSYLkUOgWRvIJL');
    
    // Verify error message is displayed
    await loginPage.verifyLoginError('Invalid login credentials');
  });

  test('should handle email field corrections and show error for invalid credentials', async ({ page }) => {
    // Fill initial email and password
    await loginPage.fillEmail('pasindu.silva@rootcode.io');
    await loginPage.pressTabInEmailInput();
    await loginPage.fillPassword('2iSYLkUOgWRvIJL');
    await loginPage.clickLoginButton();
    
    // Correct email address multiple times (simulating user corrections)
    await loginPage.fillEmail('pasindu.silva@rootcodelabs.io');
    await loginPage.clickLoginButton();
    
    // Use undo functionality
    await loginPage.pressUndoInEmailInput();
    await loginPage.fillEmail('pasindu.silva@rootcodel.io');
    await loginPage.pressUndoInEmailInput();
    await loginPage.fillEmail('pasindu.silva@rootcode.io');
    await loginPage.clickLoginButton();

    // Verify error message for invalid credentials
    await loginPage.verifyLoginError('Invalid login credentials');
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Login with valid credentials (from auth setup)
    await loginPage.login('sahan.amarsha+test2@rootcode.io', 'Test@123');
    
    // Verify successful login
    await loginPage.verifySuccessfulLogin();
  });

  test('should handle empty form submission', async ({ page }) => {
    // Try to submit without filling any fields
    await loginPage.clickLoginButton();
    
    // The form should either show validation errors or prevent submission
    // Since we don't have specific validation error test IDs, we verify we're still on login page
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });

  test('should navigate to sign up page', async ({ page }) => {
    // Click on sign up link
    await loginPage.signUpLink.click();
    
    // Verify navigation to sign up page
    await expect(page).toHaveURL(/.*\/signup/);
  });
});
