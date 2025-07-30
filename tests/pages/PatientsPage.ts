import { Page, Locator, expect } from '@playwright/test';

export class PatientsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly pageDescription: Locator;
  readonly addPatientButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByRole('heading', { name: 'Patients' });
    this.pageDescription = page.getByText('Manage and monitor your patients\' health information');
    this.addPatientButton = page.getByRole('button', { name: 'Add Patient' });
    this.searchInput = page.getByPlaceholder('Search patients by name or email...');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/dashboard/patients');
  }

  async expectToBeVisible() {
    await expect(this.pageTitle).toBeVisible();
  }

  async openAddPatientModal() {
    await this.addPatientButton.click();
  }

  async searchPatients(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async expectPatientInList(fullName: string, email: string) {
    await expect(this.page.getByRole('heading', { name: fullName })).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
  }

  async expectPatientDetails(fullName: string, gender: string, phone: string, city: string) {
    const patientCards = this.page.locator('.space-y-4 > div');
    const targetCard = patientCards.filter({ hasText: fullName }).first();
    await expect(targetCard.getByText(`Gender: ${gender}`)).toBeVisible();
    await expect(targetCard.getByText(`Phone: ${phone}`)).toBeVisible();
    await expect(targetCard.getByText(`City: ${city}`)).toBeVisible();
  }

  async expectFirstPatientDetails(gender: string, phone: string, city: string) {
    const patientCard = this.page.locator('.space-y-4 > div').first();
    await expect(patientCard.getByText(`Gender: ${gender}`)).toBeVisible();
    await expect(patientCard.getByText(`Phone: ${phone}`)).toBeVisible();
    await expect(patientCard.getByText(`City: ${city}`)).toBeVisible();
  }

  async expectAgeVisible() {
    await expect(this.page.getByText(/Age: \d+/)).toBeVisible();
  }
}
