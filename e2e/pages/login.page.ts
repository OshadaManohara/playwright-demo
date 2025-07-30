import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly formMessage: Locator;
  readonly signUpLink: Locator;
  readonly githubButton: Locator;
  readonly pageTitle: Locator;
  readonly pageDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-submit-button');
    this.formMessage = page.getByTestId('form-message');
    this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
    this.githubButton = page.getByRole('button', { name: 'Continue with GitHub' });
    this.pageTitle = page.getByText('Sign In');
    this.pageDescription = page.getByText('Enter your email and password to access your account');
  }

  async navigateTo() {
    await this.page.goto('http://localhost:3001/');
  }

  async fillEmail(email: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async verifyLoginError(expectedMessage: string) {
    await expect(this.formMessage).toHaveText(expectedMessage);
  }

  async verifyLoginPageElements() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageDescription).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.githubButton).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }

  async verifySuccessfulLogin() {
    // Wait for navigation to dashboard after successful login
    await expect(this.page).toHaveURL(/.*\/dashboard/);
    await expect(this.page.getByText('Admin')).toBeVisible();
  }

  async clearEmailInput() {
    await this.emailInput.clear();
  }

  async clearPasswordInput() {
    await this.passwordInput.clear();
  }

  async pressTabInEmailInput() {
    await this.emailInput.press('Tab');
  }

  async pressArrowLeftInEmailInput(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.emailInput.press('ArrowLeft');
    }
  }

  async pressUndoInEmailInput() {
    await this.emailInput.press('ControlOrMeta+z');
  }

  async getEmailInputValue() {
    return await this.emailInput.inputValue();
  }

  async getPasswordInputValue() {
    return await this.passwordInput.inputValue();
  }
}
