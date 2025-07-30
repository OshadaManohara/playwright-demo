import { test, expect } from '@playwright/test';
import { SignupPage, DashboardPage } from './pages';

test.describe('Signup Tests', () => {
  test('should signup successfully with valid credentials', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to the signup page
    await signupPage.goto();

    // Verify we're on the signup page
    await signupPage.expectToBeVisible();

    // Generate unique email and perform signup
    const testEmail = signupPage.generateUniqueEmail();
    await signupPage.signup(testEmail, 'TestPassword123!', 'TestPassword123!');

    // Verify successful signup
    await signupPage.expectSignupSuccess();
    await dashboardPage.expectToBeVisible();
  });

  test('should show error for mismatched passwords', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Navigate to the signup page
    await signupPage.goto();

    // Attempt signup with mismatched passwords
    await signupPage.signup('test@example.com', 'TestPassword123!', 'DifferentPassword123!');

    // Verify we remain on the signup page
    await signupPage.expectToRemainOnSignup();
  });

  test('should show error for invalid email format', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Navigate to the signup page
    await signupPage.goto();

    // Attempt signup with invalid email
    await signupPage.signup('invalid-email', 'TestPassword123!', 'TestPassword123!');

    // Verify we remain on the signup page
    await signupPage.expectToRemainOnSignup();
  });

  test('should show error for weak password', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Navigate to the signup page
    await signupPage.goto();

    // Attempt signup with weak password
    await signupPage.signup('test@example.com', '123', '123');

    // Verify we remain on the signup page
    await signupPage.expectToRemainOnSignup();
  });

  test('should navigate to signin page', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Navigate to the signup page
    await signupPage.goto();

    // Click the Sign In link
    await signupPage.clickSignIn();

    // Verify navigation to signin page
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByText('Sign In').first()).toBeVisible();
    await expect(page.getByText('Enter your email and password to access your account')).toBeVisible();
  });

  test('should display GitHub signup option', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Navigate to the signup page
    await signupPage.goto();

    // Verify GitHub signup button is present
    await expect(signupPage.githubButton).toBeVisible();
  });

  test('should have proper form labels and placeholders', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Navigate to the signup page
    await signupPage.goto();

    // Verify all form elements are present with correct labels
    await signupPage.expectAllFormElements();
  });

  test('should handle empty form submission', async ({ page }) => {
    const signupPage = new SignupPage(page);

    // Navigate to the signup page
    await signupPage.goto();

    // Try to submit empty form
    await signupPage.submitEmptyForm();

    // Verify we remain on the signup page
    await signupPage.expectToRemainOnSignup();
  });
});
