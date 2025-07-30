import { Page, Locator, expect } from '@playwright/test';

export interface PatientData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  address2?: string;
  city: string;
  zipCode: string;
  gender: 'Male' | 'Female' | 'Other';
}

export class AddPatientModal {
  readonly page: Page;
  readonly modal: Locator;
  readonly modalTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly birthDateInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly genderDropdown: Locator;
  readonly genderLabel: Locator;
  readonly addPatientButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;

  // Validation error locators
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly birthDateError: Locator;
  readonly emailError: Locator;
  readonly phoneError: Locator;
  readonly address1Error: Locator;
  readonly cityError: Locator;
  readonly zipCodeError: Locator;
  readonly genderError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = page.getByRole('dialog', { name: 'Add New Patient' });
    this.modalTitle = page.getByRole('heading', { name: 'Add New Patient' });
    this.firstNameInput = page.getByLabel('First Name *');
    this.lastNameInput = page.getByLabel('Last Name *');
    this.birthDateInput = page.getByLabel('Birth Date *');
    this.emailInput = page.getByLabel('Email *');
    this.phoneInput = page.getByLabel('Phone *');
    this.address1Input = page.getByLabel('Address Line 1 *');
    this.address2Input = page.getByLabel('Address Line 2');
    this.cityInput = page.getByLabel('City *');
    this.zipCodeInput = page.getByLabel('ZIP Code *');
    this.genderDropdown = page.getByRole('button', { name: 'Select gender' });
    this.genderLabel = page.getByText('Gender *');
    this.addPatientButton = page.getByRole('button', { name: 'Add Patient' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.closeButton = page.getByRole('button', { name: 'Close' });

    // Validation errors
    this.firstNameError = page.getByText('First name is required');
    this.lastNameError = page.getByText('Last name is required');
    this.birthDateError = page.getByText('Birth date is required');
    this.emailError = page.getByText('Invalid email address');
    this.phoneError = page.getByText('Phone number must be at least 10 digits');
    this.address1Error = page.getByText('Address line 1 is required');
    this.cityError = page.getByText('City is required');
    this.zipCodeError = page.getByText('ZIP code is required');
    this.genderError = page.getByText('Gender is required');
  }

  async expectModalVisible() {
    await expect(this.modal).toBeVisible();
    await expect(this.modalTitle).toBeVisible();
  }

  async expectModalClosed() {
    await expect(this.modal).not.toBeVisible();
  }

  async expectAllFormFields() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.birthDateInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.phoneInput).toBeVisible();
    await expect(this.address1Input).toBeVisible();
    await expect(this.address2Input).toBeVisible();
    await expect(this.cityInput).toBeVisible();
    await expect(this.zipCodeInput).toBeVisible();
    await expect(this.genderLabel).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
    await expect(this.addPatientButton).toBeVisible();
    await expect(this.closeButton).toBeVisible();
  }

  async fillPatientForm(patientData: PatientData) {
    await this.firstNameInput.fill(patientData.firstName);
    await this.lastNameInput.fill(patientData.lastName);
    await this.birthDateInput.fill(patientData.birthDate);
    await this.emailInput.fill(patientData.email);
    await this.phoneInput.fill(patientData.phone);
    await this.address1Input.fill(patientData.address);
    if (patientData.address2) {
      await this.address2Input.fill(patientData.address2);
    }
    await this.cityInput.fill(patientData.city);
    await this.zipCodeInput.fill(patientData.zipCode);
    await this.selectGender(patientData.gender);
  }

  async fillRequiredFieldsOnly(patientData: Omit<PatientData, 'address2'>) {
    await this.firstNameInput.fill(patientData.firstName);
    await this.lastNameInput.fill(patientData.lastName);
    await this.birthDateInput.fill(patientData.birthDate);
    await this.emailInput.fill(patientData.email);
    await this.phoneInput.fill(patientData.phone);
    await this.address1Input.fill(patientData.address);
    await this.cityInput.fill(patientData.city);
    await this.zipCodeInput.fill(patientData.zipCode);
    await this.selectGender(patientData.gender);
  }

  async selectGender(gender: 'Male' | 'Female' | 'Other') {
    await this.genderDropdown.click();
    await this.page.getByRole('option', { name: gender }).click();
  }

  async expectGenderOptions() {
    await this.genderDropdown.click();
    await expect(this.page.getByRole('option', { name: 'Male' })).toBeVisible();
    await expect(this.page.getByRole('option', { name: 'Female' })).toBeVisible();
    await expect(this.page.getByRole('option', { name: 'Other' })).toBeVisible();
  }

  async expectGenderSelected(gender: string) {
    await expect(this.page.getByRole('button', { name: gender })).toBeVisible();
  }

  async submitForm() {
    await this.addPatientButton.click();
  }

  async submitEmptyForm() {
    await this.addPatientButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async close() {
    await this.closeButton.click();
  }

  async expectAllValidationErrors() {
    await expect(this.firstNameError).toBeVisible();
    await expect(this.lastNameError).toBeVisible();
    await expect(this.birthDateError).toBeVisible();
    await expect(this.emailError).toBeVisible();
    await expect(this.phoneError).toBeVisible();
    await expect(this.address1Error).toBeVisible();
    await expect(this.cityError).toBeVisible();
    await expect(this.zipCodeError).toBeVisible();
    await expect(this.genderError).toBeVisible();
  }

  async expectEmailValidationError() {
    await expect(this.emailError).toBeVisible();
  }

  async expectPhoneValidationError() {
    await expect(this.phoneError).toBeVisible();
  }

  async fillInvalidEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillShortPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async expectFormReset() {
    await expect(this.firstNameInput).toHaveValue('');
    await expect(this.emailInput).toHaveValue('');
    await expect(this.genderDropdown).toBeVisible();
  }

  async fillPartialForm(firstName: string, email: string) {
    await this.firstNameInput.fill(firstName);
    await this.emailInput.fill(email);
  }

  generatePatientData(prefix: string = 'Test'): PatientData {
    const timestamp = Date.now();
    return {
      firstName: `${prefix}${timestamp}`,
      lastName: `Patient${timestamp}`,
      birthDate: '1990-01-15',
      email: `${prefix.toLowerCase()}.patient.${timestamp}@example.com`,
      phone: '555-123-4567',
      address: '123 Test Street',
      address2: 'Apt 4B',
      city: 'Test City',
      zipCode: '12345',
      gender: 'Male'
    };
  }

  generateMinimalPatientData(prefix: string = 'Min'): Omit<PatientData, 'address2'> {
    const timestamp = Date.now();
    return {
      firstName: `${prefix}${timestamp}`,
      lastName: `Required${timestamp}`,
      birthDate: '1985-05-20',
      email: `${prefix.toLowerCase()}.required.${timestamp}@example.com`,
      phone: '1234567890',
      address: '456 Min Street',
      city: 'Min City',
      zipCode: '54321',
      gender: 'Female'
    };
  }

  generatePatientDataForGender(gender: 'Male' | 'Female' | 'Other'): PatientData {
    const timestamp = Date.now() + Math.random();
    return {
      firstName: `${gender}Test`,
      lastName: `Patient${timestamp}`,
      birthDate: '1992-03-10',
      email: `${gender.toLowerCase()}.test.${timestamp}@example.com`,
      phone: '5551234567',
      address: `789 ${gender} Street`,
      address2: undefined,
      city: `${gender} City`,
      zipCode: '67890',
      gender: gender
    };
  }

  generateAgeTestPatientData(): PatientData {
    const timestamp = Date.now();
    return {
      firstName: `Age${timestamp}`,
      lastName: `Test${timestamp}`,
      birthDate: '1980-06-15', // Should be around 44-45 years old
      email: `age.test.${timestamp}@example.com`,
      phone: '1112223333',
      address: '456 Birthday Lane',
      address2: undefined,
      city: 'Age City',
      zipCode: '99999',
      gender: 'Male'
    };
  }

  generateSearchablePatientData(): PatientData {
    const timestamp = Date.now();
    return {
      firstName: `Searchable${timestamp}`,
      lastName: `Patient${timestamp}`,
      birthDate: '1987-03-20',
      email: `searchable.${timestamp}@example.com`,
      phone: '3334445555',
      address: '789 Search Blvd',
      address2: undefined,
      city: 'Search City',
      zipCode: '11111',
      gender: 'Male'
    };
  }
}
