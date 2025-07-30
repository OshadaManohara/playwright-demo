import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly signUpLink: Locator;
  readonly githubButton: Locator;
  readonly errorMessage: Locator;
  readonly loginDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
    this.githubButton = page.getByRole('button', { name: 'Continue with GitHub' });
    this.errorMessage = page.getByText('Invalid login credentials');
    this.loginDescription = page.getByText('Enter your email and password to access your account');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async clickSignUp() {
    await this.signUpLink.click();
  }

  async clickGithubLogin() {
    await this.githubButton.click();
  }

  async expectToBeVisible() {
    await expect(this.page).toHaveTitle('Playwright Demo');
    await expect(this.loginDescription).toBeVisible();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.page).toHaveURL('http://localhost:3000/');
    await expect(this.loginDescription).toBeVisible();
  }

  async expectLoginSuccess() {
    await this.page.waitForURL('**/dashboard');
    await expect(this.page).toHaveURL(/.*dashboard.*/);
  }
}
