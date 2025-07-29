import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000');

    // Verify we're on the login page
    await expect(page).toHaveTitle('Playwright Demo');
    // Use a more specific locator to avoid strict mode violation
    await expect(page.getByText('Enter your email and password to access your account')).toBeVisible();

    // Fill in the email field
    await page.getByRole('textbox', { name: 'Email' }).fill('sahan.amarsha@rootcode.io');

    // Fill in the password field
    await page.getByRole('textbox', { name: 'Password' }).fill('Sahan@123');

    // Click the Sign In button
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard');

    // Verify successful login by checking dashboard elements
    await expect(page).toHaveURL(/.*dashboard.*/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Admin')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    // Verify navigation menu items are present
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Patients' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Activities' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Notifications' })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000');

    // Fill in invalid credentials
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid@email.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword');

    // Click the Sign In button
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify we remain on the login page (URL should not change to dashboard)
    await expect(page).toHaveURL('http://localhost:3000/');
    
    // Verify that the error message is displayed
    await expect(page.getByText('Invalid login credentials')).toBeVisible();
    
    // Verify that we're still on the login page by checking login form elements
    await expect(page.getByText('Enter your email and password to access your account')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  });

  test('should navigate to signup page', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000');

    // Click the Sign Up link
    await page.getByRole('link', { name: 'Sign Up' }).click();

    // Verify navigation to signup page
    await expect(page).toHaveURL(/.*signup.*/);
  });

  test('should display GitHub login option', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000');

    // Verify GitHub login button is present
    await expect(page.getByRole('button', { name: 'Continue with GitHub' })).toBeVisible();
  });
});
