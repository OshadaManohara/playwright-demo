import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly adminHeading: Locator;
  readonly logoutButton: Locator;
  readonly dashboardLink: Locator;
  readonly patientsLink: Locator;
  readonly activitiesLink: Locator;
  readonly notificationsLink: Locator;
  readonly dashboardTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminHeading = page.getByText('Admin');
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.patientsLink = page.getByRole('link', { name: 'Patients' });
    this.activitiesLink = page.getByRole('link', { name: 'Activities' });
    this.notificationsLink = page.getByRole('link', { name: 'Notifications' });
    this.dashboardTitle = page.getByRole('heading', { name: 'Dashboard' });
  }

  async expectToBeVisible() {
    await expect(this.adminHeading).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.dashboardLink).toBeVisible();
    await expect(this.patientsLink).toBeVisible();
    await expect(this.activitiesLink).toBeVisible();
    await expect(this.notificationsLink).toBeVisible();
  }

  async expectDashboardHeading() {
    await expect(this.dashboardTitle).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async navigateToPatients() {
    await this.patientsLink.click();
  }
}
