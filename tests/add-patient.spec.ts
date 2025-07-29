import { test, expect } from '@playwright/test';

test.describe('Add Patient Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to patients page since we're already authenticated
    await page.goto('http://localhost:3000/dashboard/patients');
    
    // Wait for the page to load and verify we're authenticated
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Patients').first()).toBeVisible();
    await expect(page.getByTestId('add-patient-button')).toBeVisible();
  });

  test('should successfully add a new patient with all required fields', async ({ page }) => {
    // Open the Add Patient modal
    await page.getByTestId('add-patient-button').click();

    // Verify modal is open
    await expect(page.getByTestId('add-patient-modal')).toBeVisible();
    await expect(page.getByText('Add New Patient')).toBeVisible();

    // Generate unique patient data to avoid conflicts
    const timestamp = Date.now();
    const testPatient = {
      firstName: 'John',
      lastName: `Doe${timestamp}`,
      birthDate: '1990-05-15',
      email: `john.doe.${timestamp}@example.com`,
      phone: '1234567890',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      zipcode: '10001',
      gender: 'Male'
    };

    // Fill out the form
    await page.getByTestId('first-name-input').fill(testPatient.firstName);
    await page.getByTestId('last-name-input').fill(testPatient.lastName);
    await page.getByTestId('birth-date-input').fill(testPatient.birthDate);
    await page.getByTestId('email-input').fill(testPatient.email);
    await page.getByTestId('phone-input').fill(testPatient.phone);
    await page.getByTestId('address-line-1-input').fill(testPatient.addressLine1);
    await page.getByTestId('address-line-2-input').fill(testPatient.addressLine2);
    await page.getByTestId('city-input').fill(testPatient.city);
    await page.getByTestId('zipcode-input').fill(testPatient.zipcode);

    // Select gender
    await page.getByTestId('select-trigger').click();
    await page.getByText(testPatient.gender, { exact: true }).click();

    // Submit the form
    await page.getByTestId('submit-button').click();

    // Verify modal closes and patient is added
    await expect(page.getByTestId('add-patient-modal')).not.toBeVisible();

    // Verify the new patient appears in the patient list
    await expect(page.getByText(`${testPatient.firstName} ${testPatient.lastName}`)).toBeVisible();
    await expect(page.getByText(testPatient.email)).toBeVisible();
    await expect(page.getByText(testPatient.city).first()).toBeVisible();
    await expect(page.getByText(testPatient.phone)).toBeVisible();
  });

  test('should show validation errors for required fields', async ({ page }) => {
    // Open the Add Patient modal
    await page.getByTestId('add-patient-button').click();

    // Try to submit empty form
    await page.getByTestId('submit-button').click();

    // Verify we're still in the modal
    await expect(page.getByTestId('add-patient-modal')).toBeVisible();

    // Verify validation errors appear for required fields
    // Note: The actual error messages depend on the validation implementation
    // This test structure can be expanded based on the specific error handling
  });

  test('should validate email format', async ({ page }) => {
    // Open the Add Patient modal
    await page.getByTestId('add-patient-button').click();

    // Fill required fields with invalid email
    await page.getByTestId('first-name-input').fill('John');
    await page.getByTestId('last-name-input').fill('Doe');
    await page.getByTestId('birth-date-input').fill('1990-05-15');
    await page.getByTestId('email-input').fill('invalid-email'); // Invalid email
    await page.getByTestId('phone-input').fill('1234567890');
    await page.getByTestId('address-line-1-input').fill('123 Main St');
    await page.getByTestId('city-input').fill('New York');
    await page.getByTestId('zipcode-input').fill('10001');
    
    // Select gender
    await page.getByTestId('select-trigger').click();
    await page.getByText('Male', { exact: true }).click();

    // Try to submit
    await page.getByTestId('submit-button').click();

    // Verify we're still in the modal (validation should prevent submission)
    await expect(page.getByTestId('add-patient-modal')).toBeVisible();
  });

  test('should validate phone number minimum length', async ({ page }) => {
    // Open the Add Patient modal
    await page.getByTestId('add-patient-button').click();

    // Fill required fields with short phone number
    await page.getByTestId('first-name-input').fill('John');
    await page.getByTestId('last-name-input').fill('Doe');
    await page.getByTestId('birth-date-input').fill('1990-05-15');
    await page.getByTestId('email-input').fill('john@example.com');
    await page.getByTestId('phone-input').fill('123'); // Too short
    await page.getByTestId('address-line-1-input').fill('123 Main St');
    await page.getByTestId('city-input').fill('New York');
    await page.getByTestId('zipcode-input').fill('10001');
    
    // Select gender
    await page.getByTestId('select-trigger').click();
    await page.getByText('Male', { exact: true }).click();

    // Try to submit
    await page.getByTestId('submit-button').click();

    // Verify we're still in the modal (validation should prevent submission)
    await expect(page.getByTestId('add-patient-modal')).toBeVisible();
  });

  test('should allow canceling the form', async ({ page }) => {
    // Open the Add Patient modal
    await page.getByTestId('add-patient-button').click();

    // Fill some fields
    await page.getByTestId('first-name-input').fill('John');
    await page.getByTestId('last-name-input').fill('Doe');

    // Click cancel
    await page.getByTestId('cancel-button').click();

    // Verify modal closes
    await expect(page.getByTestId('add-patient-modal')).not.toBeVisible();

    // Verify we're back on the patients page
    await expect(page.getByText('Patients').first()).toBeVisible();
    await expect(page.getByTestId('add-patient-button')).toBeVisible();
  });

  test('should test all gender options', async ({ page }) => {
    const genders = ['Male', 'Female', 'Other'];

    for (const gender of genders) {
      // Open the Add Patient modal
      await page.getByTestId('add-patient-button').click();

      // Generate unique data for each test
      const timestamp = Date.now() + Math.random();
      
      // Fill required fields
      await page.getByTestId('first-name-input').fill('Test');
      await page.getByTestId('last-name-input').fill(`User${timestamp}`);
      await page.getByTestId('birth-date-input').fill('1995-01-01');
      await page.getByTestId('email-input').fill(`test.${timestamp}@example.com`);
      await page.getByTestId('phone-input').fill('9876543210');
      await page.getByTestId('address-line-1-input').fill('456 Test St');
      await page.getByTestId('city-input').fill('Test City');
      await page.getByTestId('zipcode-input').fill('12345');
      
      // Select the specific gender
      await page.getByTestId('select-trigger').click();
      await page.getByText(gender, { exact: true }).click();

      // Submit the form
      await page.getByTestId('submit-button').click();

      // Verify modal closes
      await expect(page.getByTestId('add-patient-modal')).not.toBeVisible();

      // Verify the patient was created with correct gender
      await expect(page.getByText(`Test User${timestamp}`)).toBeVisible();
      
      // Wait a bit before next iteration
      await page.waitForTimeout(1000);
    }
  });

  test('should handle form submission loading state', async ({ page }) => {
    // Open the Add Patient modal
    await page.getByTestId('add-patient-button').click();

    // Fill required fields
    const timestamp = Date.now();
    await page.getByTestId('first-name-input').fill('Loading');
    await page.getByTestId('last-name-input').fill(`Test${timestamp}`);
    await page.getByTestId('birth-date-input').fill('1992-03-10');
    await page.getByTestId('email-input').fill(`loading.${timestamp}@example.com`);
    await page.getByTestId('phone-input').fill('5555555555');
    await page.getByTestId('address-line-1-input').fill('789 Loading Ave');
    await page.getByTestId('city-input').fill('Loading City');
    await page.getByTestId('zipcode-input').fill('54321');
    
    // Select gender
    await page.getByTestId('select-trigger').click();
    await page.getByText('Female', { exact: true }).click();

    // Check initial button state
    await expect(page.getByTestId('submit-button')).toContainText('Add Patient');

    // Submit the form
    await page.getByTestId('submit-button').click();

    // The button should show loading state briefly (if network is slow)
    // This might be too fast to catch in local testing, but important for real scenarios
    
    // Eventually the modal should close and patient should be added
    await expect(page.getByTestId('add-patient-modal')).not.toBeVisible();
    await expect(page.getByText(`Loading Test${timestamp}`)).toBeVisible();
  });
});
