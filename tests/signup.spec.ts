import { test, expect } from '@playwright/test';

test.describe('Signup Tests', () => {
  test('should signup successfully with valid credentials', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');

    // Verify we're on the signup page
    await expect(page).toHaveTitle('Playwright Demo');
    await expect(page.getByText('Create an account')).toBeVisible();
    await expect(page.getByText('Enter your details below to create your account and get started')).toBeVisible();

    // Generate a unique email for this test to avoid conflicts
    const timestamp = Date.now();
    const testEmail = `test.user.${timestamp}@example.com`;

    // Fill in the signup form
    await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
    await page.getByRole('textbox', { name: 'New Password' }).fill('TestPassword123!');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('TestPassword123!');

    // Click the Create Account button
    await page.getByRole('button', { name: 'Create Account' }).click();

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard/**');

    // Verify successful signup by checking dashboard elements
    await expect(page).toHaveURL(/.*dashboard.*/);
    await expect(page.getByText('Admin')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    // Verify navigation menu items are present
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Patients' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Activities' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Notifications' })).toBeVisible();
  });

  test('should show error for mismatched passwords', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');

    // Fill in the form with mismatched passwords
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page.getByRole('textbox', { name: 'New Password' }).fill('TestPassword123!');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('DifferentPassword123!');

    // Click the Create Account button
    await page.getByRole('button', { name: 'Create Account' }).click();

    // Verify we remain on the signup page
    await expect(page).toHaveURL('http://localhost:3000/signup');
    
    // Check that we're still on the signup form
    await expect(page.getByText('Create an account')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  });

  test('should show error for invalid email format', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');

    // Fill in the form with invalid email
    await page.getByRole('textbox', { name: 'Email' }).fill('invalid-email');
    await page.getByRole('textbox', { name: 'New Password' }).fill('TestPassword123!');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('TestPassword123!');

    // Click the Create Account button
    await page.getByRole('button', { name: 'Create Account' }).click();

    // Verify we remain on the signup page
    await expect(page).toHaveURL('http://localhost:3000/signup');
    
    // Check that we're still on the signup form
    await expect(page.getByText('Create an account')).toBeVisible();
  });

  test('should show error for weak password', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');

    // Fill in the form with weak password
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page.getByRole('textbox', { name: 'New Password' }).fill('123');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('123');

    // Click the Create Account button
    await page.getByRole('button', { name: 'Create Account' }).click();

    // Verify we remain on the signup page
    await expect(page).toHaveURL('http://localhost:3000/signup');
    
    // Check that we're still on the signup form
    await expect(page.getByText('Create an account')).toBeVisible();
  });

  test('should navigate to signin page', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');

    // Click the Sign In link
    await page.getByRole('link', { name: 'Sign In' }).click();

    // Verify navigation to signin page
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByText('Sign In').first()).toBeVisible();
    await expect(page.getByText('Enter your email and password to access your account')).toBeVisible();
  });

  test('should display GitHub signup option', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');

    // Verify GitHub signup button is present
    await expect(page.getByRole('button', { name: 'Sign up with GitHub' })).toBeVisible();
  });

  test('should have proper form labels and placeholders', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');

    // Verify all form elements are present with correct labels
    await expect(page.getByText('Email')).toBeVisible();
    await expect(page.getByText('New Password')).toBeVisible();
    await expect(page.getByText('Confirm Password')).toBeVisible();
    
    // Verify all input fields are present
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'New Password' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Confirm Password' })).toBeVisible();
    
    // Verify the submit button
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  });

  test('should handle empty form submission', async ({ page }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000/signup');

    // Try to submit empty form
    await page.getByRole('button', { name: 'Create Account' }).click();

    // Verify we remain on the signup page
    await expect(page).toHaveURL('http://localhost:3000/signup');
    
    // Check that we're still on the signup form
    await expect(page.getByText('Create an account')).toBeVisible();
  });
});
