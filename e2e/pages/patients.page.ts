import { Page, Locator, expect } from '@playwright/test';

export class PatientsPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly pageDescription: Locator;
  readonly addPatientButton: Locator;
  readonly searchInput: Locator;
  readonly patientsGrid: Locator;
  readonly patientCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: 'Patients', level: 1 });
    this.pageDescription = page.getByText('Manage and monitor your patients\' health information');
    this.addPatientButton = page.getByRole('button', { name: 'Add Patient' });
    this.searchInput = page.getByTestId('patients-search-input');
    this.patientsGrid = page.getByTestId('patients-grid');
    this.patientCards = page.getByTestId('patient-card');
  }

  async navigateTo() {
    await this.page.goto('http://localhost:3001/dashboard/patients');
    await expect(this.page).toHaveURL(/.*\/dashboard\/patients/);
  }

  async waitForPageLoad() {
    await expect(this.searchInput).toBeVisible();
  }

  async searchPatients(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  async clearSearch() {
    await this.searchInput.fill('');
  }

  async getSearchInputValue() {
    return await this.searchInput.inputValue();
  }

  async getPatientCardsCount() {
    return await this.patientCards.count();
  }

  async verifyPatientVisible(patientName: string) {
    await expect(this.page.getByText(patientName)).toBeVisible();
  }

  async verifyPatientNotVisible(patientName: string) {
    await expect(this.page.getByText(patientName)).not.toBeVisible();
  }

  async verifyEmailVisible(email: string) {
    await expect(this.page.getByText(email)).toBeVisible();
  }

  async verifyPageElements() {
    await expect(this.pageHeading).toBeVisible();
    await expect(this.pageDescription).toBeVisible();
    await expect(this.addPatientButton).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toHaveAttribute('placeholder', 'Search patients by name or email...');
  }

  async verifySearchInputEmpty() {
    await expect(this.searchInput).toHaveValue('');
  }

  getPatientCard(patientName: string) {
    return this.patientsGrid.locator('div').filter({ hasText: patientName });
  }

  async verifyPatientCardDetails(patientName: string, details: {
    initials: string;
    age: string;
    email: string;
    gender: string;
    phone: string;
    city: string;
  }) {
    const patientCard = this.getPatientCard(patientName);
    
    await expect(patientCard.getByText(details.initials)).toBeVisible();
    await expect(patientCard.getByRole('heading', { name: patientName })).toBeVisible();
    await expect(patientCard.getByText(details.age)).toBeVisible();
    await expect(patientCard.getByText(details.email)).toBeVisible();
    await expect(patientCard.getByText(details.gender)).toBeVisible();
    await expect(patientCard.getByText(details.phone)).toBeVisible();
    await expect(patientCard.getByText(details.city)).toBeVisible();
    await expect(patientCard.getByTestId('view-patient-button')).toBeVisible();
  }

  async clickViewPatientButton(patientName: string) {
    const patientCard = this.getPatientCard(patientName);
    await patientCard.getByTestId('view-patient-button').click();
  }

  async verifyAllPatientsVisible() {
    await this.verifyPatientVisible('Chamari Atapattu');
    await this.verifyEmailVisible('chamari.atapattu@gmail.com');
    await this.verifyPatientVisible('Kusal Mendis');
    await this.verifyEmailVisible('kusal.mendis@gmail.com');
    await this.verifyPatientVisible('Angelo Mathews');
    await this.verifyEmailVisible('angelo.mathews@gmail.com');
  }

  async verifyPatientCardCount(expectedCount: number) {
    await expect(this.patientCards).toHaveCount(expectedCount);
  }
}
