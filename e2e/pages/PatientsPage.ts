import { Page, Locator, expect } from '@playwright/test';

export class PatientsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly description: Locator;
  readonly addPatientButton: Locator;
  readonly searchInput: Locator;
  readonly patientsGrid: Locator;
  readonly patientCards: Locator;

  // Patient card elements
  readonly chamariCard: Locator;
  readonly kusalCard: Locator;
  readonly angeloCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Patients', level: 1 });
    this.description = page.getByText('Manage and monitor your patients\' health information');
    this.addPatientButton = page.getByRole('button', { name: 'Add Patient' });
    this.searchInput = page.getByTestId('patients-search-input');
    this.patientsGrid = page.getByTestId('patients-grid');
    this.patientCards = page.getByTestId('patient-card');

    // Patient-specific cards
    this.chamariCard = this.patientsGrid.locator('div').filter({ hasText: 'Chamari Atapattu' });
    this.kusalCard = this.patientsGrid.locator('div').filter({ hasText: 'Kusal Mendis' });
    this.angeloCard = this.patientsGrid.locator('div').filter({ hasText: 'Angelo Mathews' });
  }

  async goto() {
    await this.page.goto('http://localhost:3000/dashboard/patients');
    await expect(this.page).toHaveURL('http://localhost:3000/dashboard/patients');
  }

  async gotoFromDashboard() {
    await this.page.getByTestId('nav-patients').click();
    await expect(this.page).toHaveURL(/.*\/dashboard\/patients/);
  }

  async verifyPageElements() {
    await expect(this.heading).toBeVisible();
    await expect(this.description).toBeVisible();
    await expect(this.addPatientButton).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toHaveAttribute('placeholder', 'Search patients by name or email...');
  }

  async verifyAllPatientsVisible() {
    await expect(this.page.getByRole('heading', { name: 'Chamari Atapattu' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Kusal Mendis' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Angelo Mathews' })).toBeVisible();
    
    await expect(this.page.getByText('chamari.atapattu@gmail.com')).toBeVisible();
    await expect(this.page.getByText('kusal.mendis@gmail.com')).toBeVisible();
    await expect(this.page.getByText('angelo.mathews@gmail.com')).toBeVisible();
  }

  async verifyPatientCardsCount(expectedCount: number) {
    await expect(this.patientCards).toHaveCount(expectedCount);
  }

  async verifySearchInputEmpty() {
    await expect(this.searchInput).toHaveValue('');
  }

  async searchPatient(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.page.waitForTimeout(1000); // Wait for search filtering
  }

  async clearSearch() {
    await this.searchInput.clear();
    await this.page.waitForTimeout(1000); // Wait for reset
  }

  async verifyPatientVisible(patientName: string, email: string) {
    await expect(this.page.getByRole('heading', { name: patientName })).toBeVisible();
    await expect(this.page.getByText(email)).toBeVisible();
  }

  async verifyPatientNotVisible(patientName: string) {
    await expect(this.page.getByRole('heading', { name: patientName })).not.toBeVisible();
  }

  async verifyPatientCardDetails(patientData: {
    name: string;
    initials: string;
    age: string;
    email: string;
    gender: string;
    phone: string;
    city: string;
  }) {
    const card = this.patientsGrid.locator('div').filter({ hasText: patientData.name });
    
    await expect(card.getByText(patientData.initials)).toBeVisible();
    await expect(card.getByRole('heading', { name: patientData.name })).toBeVisible();
    await expect(card.getByText(`Age: ${patientData.age}`)).toBeVisible();
    await expect(card.getByText(patientData.email)).toBeVisible();
    await expect(card.getByText(`Gender: ${patientData.gender}`)).toBeVisible();
    await expect(card.getByText(`Phone: ${patientData.phone}`)).toBeVisible();
    await expect(card.getByText(`City: ${patientData.city}`)).toBeVisible();
    await expect(card.getByTestId('view-patient-button')).toBeVisible();
  }

  async clickViewPatientButton(patientName: string) {
    const card = this.patientsGrid.locator('div').filter({ hasText: patientName });
    await card.getByTestId('view-patient-button').click();
  }

  async setupConsoleListener() {
    const consoleMessages: string[] = [];
    this.page.on('console', msg => {
      if (msg.type() === 'log' && msg.text().includes('View patient details')) {
        consoleMessages.push(msg.text());
      }
    });
    return consoleMessages;
  }
}
