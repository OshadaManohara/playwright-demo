import { test, expect } from '@playwright/test';
import { PatientsPage, AddPatientModal } from './pages';

test.describe('Add Patient Modal', () => {
  let patientsPage: PatientsPage;
  let addPatientModal: AddPatientModal;

  test.beforeEach(async ({ page }) => {
    patientsPage = new PatientsPage(page);
    addPatientModal = new AddPatientModal(page);

    // Navigate directly to patients page (auth state is already loaded)
    await patientsPage.goto();
    
    // Wait for the page to load
    await patientsPage.expectToBeVisible();
  });

  test('should open and close add patient modal', async ({ page }) => {
    // Open modal
    await patientsPage.openAddPatientModal();
    await addPatientModal.expectModalVisible();
    
    // Close modal using Cancel button
    await addPatientModal.cancel();
    await addPatientModal.expectModalClosed();
  });

  test('should close modal using X button', async ({ page }) => {
    // Open modal
    await patientsPage.openAddPatientModal();
    await addPatientModal.expectModalVisible();
    
    // Close modal using X button
    await addPatientModal.close();
    await addPatientModal.expectModalClosed();
  });

  test('should display all required form fields', async ({ page }) => {
    // Open modal
    await patientsPage.openAddPatientModal();
    
    // Verify all form fields are present
    await addPatientModal.expectAllFormFields();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    // Open modal and submit empty form
    await patientsPage.openAddPatientModal();
    await addPatientModal.submitEmptyForm();
    
    // Verify all validation errors appear and modal stays open
    await addPatientModal.expectAllValidationErrors();
    await addPatientModal.expectModalVisible();
  });

  test('should test gender dropdown functionality', async ({ page }) => {
    // Open modal
    await patientsPage.openAddPatientModal();
    
    // Test gender dropdown options
    await addPatientModal.expectGenderOptions();
    
    // Select Male and verify selection
    await addPatientModal.selectGender('Male');
    await addPatientModal.expectGenderSelected('Male');
  });

  test('should successfully add a new patient with all fields', async ({ page }) => {
    // Generate test data and open modal
    const patientData = addPatientModal.generatePatientData();
    await patientsPage.openAddPatientModal();
    
    // Fill and submit form
    await addPatientModal.fillPatientForm(patientData);
    await addPatientModal.submitForm();
    
    // Verify modal closes and patient appears
    await addPatientModal.expectModalClosed();
    const fullName = `${patientData.firstName} ${patientData.lastName}`;
    await patientsPage.expectPatientInList(fullName, patientData.email);
    await patientsPage.expectFirstPatientDetails(patientData.gender, patientData.phone, patientData.city);
  });

  test('should successfully add a new patient with minimum required fields', async ({ page }) => {
    // Generate test data and open modal
    const patientData = addPatientModal.generateMinimalPatientData();
    await patientsPage.openAddPatientModal();
    
    // Fill and submit form with required fields only
    await addPatientModal.fillRequiredFieldsOnly(patientData);
    await addPatientModal.submitForm();
    
    // Verify success
    await addPatientModal.expectModalClosed();
    const fullName = `${patientData.firstName} ${patientData.lastName}`;
    await patientsPage.expectPatientInList(fullName, patientData.email);
  });

  test('should test all gender options', async ({ page }) => {
    const genderOptions: ('Male' | 'Female' | 'Other')[] = ['Male', 'Female', 'Other'];
    
    for (const gender of genderOptions) {
      // Generate test data for specific gender
      const patientData = addPatientModal.generatePatientDataForGender(gender);
      
      // Open modal and fill form
      await patientsPage.openAddPatientModal();
      await addPatientModal.fillPatientForm(patientData);
      await addPatientModal.submitForm();
      
      // Verify success and correct gender display
      await addPatientModal.expectModalClosed();
      const fullName = `${patientData.firstName} ${patientData.lastName}`;
      await patientsPage.expectPatientInList(fullName, patientData.email);
      await patientsPage.expectPatientDetails(fullName, gender, patientData.phone, patientData.city);
    }
  });

  test('should validate email format', async ({ page }) => {
    // Open modal
    await patientsPage.openAddPatientModal();
    
    // Fill with invalid email and submit
    await addPatientModal.fillInvalidEmail('invalid-email');
    await addPatientModal.submitForm();
    
    // Verify email validation error and modal stays open
    await addPatientModal.expectEmailValidationError();
    await addPatientModal.expectModalVisible();
  });

  test('should validate phone number length', async ({ page }) => {
    // Open modal
    await patientsPage.openAddPatientModal();
    
    // Fill with short phone and submit
    await addPatientModal.fillShortPhone('123');
    await addPatientModal.submitForm();
    
    // Verify phone validation error and modal stays open
    await addPatientModal.expectPhoneValidationError();
    await addPatientModal.expectModalVisible();
  });

  test('should handle form reset when modal is reopened', async ({ page }) => {
    // Open modal and fill some fields
    await patientsPage.openAddPatientModal();
    await addPatientModal.fillPartialForm('Test Name', 'test@example.com');
    
    // Cancel modal and reopen
    await addPatientModal.cancel();
    await patientsPage.openAddPatientModal();
    
    // Verify fields are reset
    await addPatientModal.expectFormReset();
  });

  test('should verify age calculation from birth date', async ({ page }) => {
    // Generate test data with specific birth date
    const patientData = addPatientModal.generateAgeTestPatientData();
    
    // Open modal, fill form and submit
    await patientsPage.openAddPatientModal();
    await addPatientModal.fillPatientForm(patientData);
    await addPatientModal.submitForm();
    
    // Verify patient creation and age display
    await addPatientModal.expectModalClosed();
    const fullName = `${patientData.firstName} ${patientData.lastName}`;
    await patientsPage.expectPatientInList(fullName, patientData.email);
    await patientsPage.expectAgeVisible();
  });

  test('should integrate with search functionality after adding patient', async ({ page }) => {
    // Generate searchable test data
    const patientData = addPatientModal.generateSearchablePatientData();
    
    // Create patient
    await patientsPage.openAddPatientModal();
    await addPatientModal.fillPatientForm(patientData);
    await addPatientModal.submitForm();
    
    // Verify patient was created
    await addPatientModal.expectModalClosed();
    const fullName = `${patientData.firstName} ${patientData.lastName}`;
    await patientsPage.expectPatientInList(fullName, patientData.email);
    
    // Test search functionality
    await patientsPage.searchPatients(patientData.firstName);
    await patientsPage.expectPatientInList(fullName, patientData.email);
    
    // Clear search and verify patient still exists
    await patientsPage.clearSearch();
    await patientsPage.expectPatientInList(fullName, patientData.email);
  });
});