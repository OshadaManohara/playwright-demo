import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}
