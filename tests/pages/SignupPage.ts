import { Page, Locator, expect } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly createAccountButton: Locator;
  readonly signInLink: Locator;
  readonly githubButton: Locator;
  readonly pageTitle: Locator;
  readonly pageDescription: Locator;
  readonly emailLabel: Locator;
  readonly passwordLabel: Locator;
  readonly confirmPasswordLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'New Password' });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.signInLink = page.getByRole('link', { name: 'Sign In' });
    this.githubButton = page.getByRole('button', { name: 'Sign up with GitHub' });
    this.pageTitle = page.getByText('Create an account');
    this.pageDescription = page.getByText('Enter your details below to create your account and get started');
    this.emailLabel = page.getByText('Email');
    this.passwordLabel = page.getByText('New Password');
    this.confirmPasswordLabel = page.getByText('Confirm Password');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/signup');
  }

  async signup(email: string, password: string, confirmPassword: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.createAccountButton.click();
  }

  async clickSignIn() {
    await this.signInLink.click();
  }

  async clickGithubSignup() {
    await this.githubButton.click();
  }

  async submitEmptyForm() {
    await this.createAccountButton.click();
  }

  async expectToBeVisible() {
    await expect(this.page).toHaveTitle('Playwright Demo');
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageDescription).toBeVisible();
  }

  async expectSignupSuccess() {
    await this.page.waitForURL('**/dashboard/**');
    await expect(this.page).toHaveURL(/.*dashboard.*/);
  }

  async expectToRemainOnSignup() {
    await expect(this.page).toHaveURL('http://localhost:3000/signup');
    await expect(this.pageTitle).toBeVisible();
  }

  async expectAllFormElements() {
    await expect(this.emailLabel).toBeVisible();
    await expect(this.passwordLabel).toBeVisible();
    await expect(this.confirmPasswordLabel).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.confirmPasswordInput).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
  }

  generateUniqueEmail(): string {
    const timestamp = Date.now();
    return `test.user.${timestamp}@example.com`;
  }
}
