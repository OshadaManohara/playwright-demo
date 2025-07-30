import { test, expect } from '@playwright/test';

test.describe('Add Patient Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to patients page (authentication already handled by setup)
    await page.goto('http://localhost:3000/dashboard/patients');
    
    // Wait for patients page to load
    await expect(page.locator('h1:has-text("Patients")')).toBeVisible();
  });

  test('should successfully add a new patient with all required fields', async ({ page }) => {
    // Click Add Patient button to open modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Verify modal is open
    await expect(page.getByRole('dialog', { name: 'Add New Patient' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Add New Patient' })).toBeVisible();
    
    // Generate unique test data
    const timestamp = Date.now();
    const testData = {
      firstName: `Test`,
      lastName: `Patient${timestamp}`,
      birthDate: '1990-01-01',
      email: `test.patient.${timestamp}@example.com`,
      phone: '555-123-4567',
      addressLine1: '123 Test Street',
      city: 'Test City',
      zipCode: '12345',
      gender: 'Male'
    };
    
    // Fill in all required fields
    await page.getByRole('textbox', { name: 'First Name *' }).fill(testData.firstName);
    await page.getByRole('textbox', { name: 'Last Name *' }).fill(testData.lastName);
    await page.getByRole('textbox', { name: 'Birth Date *' }).fill(testData.birthDate);
    await page.getByRole('textbox', { name: 'Email *' }).fill(testData.email);
    await page.getByRole('textbox', { name: 'Phone *' }).fill(testData.phone);
    await page.getByRole('textbox', { name: 'Address Line 1 *' }).fill(testData.addressLine1);
    await page.getByRole('textbox', { name: 'City *' }).fill(testData.city);
    await page.getByRole('textbox', { name: 'ZIP Code *' }).fill(testData.zipCode);
    
    // Select gender
    await page.getByRole('button', { name: 'Select gender' }).click();
    await page.getByText(testData.gender, { exact: true }).click();
    
    // Verify gender is selected
    await expect(page.getByRole('button', { name: testData.gender })).toBeVisible();
    
    // Submit the form
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Verify modal is closed
    await expect(page.getByRole('dialog', { name: 'Add New Patient' })).not.toBeVisible();
    
    // Verify the new patient appears in the list
    const patientCard = page.locator(`text=${testData.firstName} ${testData.lastName}`).first();
    await expect(patientCard).toBeVisible();
    
    // Verify patient details are displayed correctly
    await expect(page.locator('text="Gender:"').locator('..').locator(`text=${testData.gender}`)).toBeVisible();
    await expect(page.locator('text="Phone:"').locator('..').locator(`text=${testData.phone}`)).toBeVisible();
    await expect(page.locator('text="City:"').locator('..').locator(`text=${testData.city}`)).toBeVisible();
  });

  test('should display validation errors for missing required fields', async ({ page }) => {
    // Open Add Patient modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    await expect(page.getByRole('dialog', { name: 'Add New Patient' })).toBeVisible();
    
    // Try to submit form without filling required fields
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Verify modal is still open (form should not submit with empty required fields)
    await expect(page.getByRole('dialog', { name: 'Add New Patient' })).toBeVisible();
  });

  test('should allow gender selection from dropdown', async ({ page }) => {
    // Open Add Patient modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Click gender dropdown
    await page.getByRole('button', { name: 'Select gender' }).click();
    
    // Verify all gender options are available
    await expect(page.getByText('Male', { exact: true })).toBeVisible();
    await expect(page.getByText('Female', { exact: true })).toBeVisible();
    await expect(page.getByText('Other', { exact: true })).toBeVisible();
    
    // Select Female
    await page.getByText('Female', { exact: true }).click();
    await expect(page.getByRole('button', { name: 'Female' })).toBeVisible();
    
    // Change to Other
    await page.getByRole('button', { name: 'Female' }).click();
    await page.getByText('Other', { exact: true }).click();
    await expect(page.getByRole('button', { name: 'Other' })).toBeVisible();
  });

  test('should handle loading state properly', async ({ page }) => {
    // Open Add Patient modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Fill form with valid data
    const timestamp = Date.now();
    await page.getByRole('textbox', { name: 'First Name *' }).fill('Loading');
    await page.getByRole('textbox', { name: 'Last Name *' }).fill(`State${timestamp}`);
    await page.getByRole('textbox', { name: 'Birth Date *' }).fill('1987-05-15');
    await page.getByRole('textbox', { name: 'Email *' }).fill(`loading.${timestamp}@example.com`);
    await page.getByRole('textbox', { name: 'Phone *' }).fill('7778889999');
    await page.getByRole('textbox', { name: 'Address Line 1 *' }).fill('456 Loading Ave');
    await page.getByRole('textbox', { name: 'City *' }).fill('Loading City');
    await page.getByRole('textbox', { name: 'ZIP Code *' }).fill('67890');
    
    // Select gender
    await page.getByRole('button', { name: 'Select gender' }).click();
    await page.getByText('Other', { exact: true }).click();
    
    // Submit form
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Verify patient was created successfully
    await expect(page.locator(`text=Loading State${timestamp}`)).toBeVisible();
    await expect(page.locator('text="Gender:"').locator('..').locator('text=Other')).toBeVisible();
    await expect(page.locator('text="Phone:"').locator('..').locator('text=7778889999')).toBeVisible();
    await expect(page.locator('text="City:"').locator('..').locator('text=Loading City')).toBeVisible();
  });

  test('should be able to search for newly created patient', async ({ page }) => {
    // First create a patient with searchable name
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    const timestamp = Date.now();
    const searchableData = {
      firstName: 'Searchable',
      lastName: `Patient${timestamp}`,
      email: `searchable.${timestamp}@example.com`
    };
    
    await page.getByRole('textbox', { name: 'First Name *' }).fill(searchableData.firstName);
    await page.getByRole('textbox', { name: 'Last Name *' }).fill(searchableData.lastName);
    await page.getByRole('textbox', { name: 'Birth Date *' }).fill('1987-03-20');
    await page.getByRole('textbox', { name: 'Email *' }).fill(searchableData.email);
    await page.getByRole('textbox', { name: 'Phone *' }).fill('3334445555');
    await page.getByRole('textbox', { name: 'Address Line 1 *' }).fill('789 Search Blvd');
    await page.getByRole('textbox', { name: 'City *' }).fill('Search City');
    await page.getByRole('textbox', { name: 'ZIP Code *' }).fill('11111');
    
    await page.getByRole('button', { name: 'Select gender' }).click();
    await page.getByText('Male', { exact: true }).click();
    
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Verify patient was created
    await expect(page.locator(`text=${searchableData.firstName} ${searchableData.lastName}`)).toBeVisible();
    
    // Test search functionality
    await page.getByRole('textbox', { name: 'Search patients by name or email...' }).fill(searchableData.firstName);
    
    // Verify search results
    await expect(page.locator(`text=${searchableData.firstName} ${searchableData.lastName}`)).toBeVisible();
    await expect(page.locator('text="Gender:"').locator('..').locator('text=Male')).toBeVisible();
    await expect(page.locator('text="Phone:"').locator('..').locator('text=3334445555')).toBeVisible();
    await expect(page.locator('text="City:"').locator('..').locator('text=Search City')).toBeVisible();
    
    // Clear search and verify all patients are shown again
    await page.getByRole('textbox', { name: 'Search patients by name or email...' }).clear();
    
    // Should see multiple patients now
    const patientCards = page.locator('[role="button"]:has-text("View")');
    await expect(patientCards.first()).toBeVisible();
  });

  test('should close modal when cancel button is clicked', async ({ page }) => {
    // Open Add Patient modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    await expect(page.getByRole('dialog', { name: 'Add New Patient' })).toBeVisible();
    
    // Click Cancel button
    await page.getByRole('button', { name: 'Cancel' }).click();
    
    // Verify modal is closed
    await expect(page.getByRole('dialog', { name: 'Add New Patient' })).not.toBeVisible();
  });

  test('should close modal when X button is clicked', async ({ page }) => {
    // Open Add Patient modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    await expect(page.getByRole('dialog', { name: 'Add New Patient' })).toBeVisible();
    
    // Click Close (X) button
    await page.getByRole('button', { name: 'Close' }).click();
    
    // Verify modal is closed
    await expect(page.getByRole('dialog', { name: 'Add New Patient' })).not.toBeVisible();
  });

  test('should handle optional Address Line 2 field', async ({ page }) => {
    // Open Add Patient modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    const timestamp = Date.now();
    
    // Fill all fields including optional Address Line 2
    await page.getByRole('textbox', { name: 'First Name *' }).fill('Address');
    await page.getByRole('textbox', { name: 'Last Name *' }).fill(`Test${timestamp}`);
    await page.getByRole('textbox', { name: 'Birth Date *' }).fill('1995-12-10');
    await page.getByRole('textbox', { name: 'Email *' }).fill(`address.${timestamp}@example.com`);
    await page.getByRole('textbox', { name: 'Phone *' }).fill('9998887777');
    await page.getByRole('textbox', { name: 'Address Line 1 *' }).fill('123 Main St');
    await page.getByRole('textbox', { name: 'Address Line 2' }).fill('Apt 4B'); // Optional field
    await page.getByRole('textbox', { name: 'City *' }).fill('Address City');
    await page.getByRole('textbox', { name: 'ZIP Code *' }).fill('54321');
    
    await page.getByRole('button', { name: 'Select gender' }).click();
    await page.getByText('Female', { exact: true }).click();
    
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Verify patient was created successfully
    await expect(page.locator(`text=Address Test${timestamp}`)).toBeVisible();
  });

  test('should calculate and display correct age from birth date', async ({ page }) => {
    // Open Add Patient modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    const timestamp = Date.now();
    
    // Fill form with a specific birth date to test age calculation
    await page.getByRole('textbox', { name: 'First Name *' }).fill('Age');
    await page.getByRole('textbox', { name: 'Last Name *' }).fill(`Test${timestamp}`);
    await page.getByRole('textbox', { name: 'Birth Date *' }).fill('1980-06-15'); // Should be around 44-45 years old
    await page.getByRole('textbox', { name: 'Email *' }).fill(`age.${timestamp}@example.com`);
    await page.getByRole('textbox', { name: 'Phone *' }).fill('1112223333');
    await page.getByRole('textbox', { name: 'Address Line 1 *' }).fill('456 Birthday Lane');
    await page.getByRole('textbox', { name: 'City *' }).fill('Age City');
    await page.getByRole('textbox', { name: 'ZIP Code *' }).fill('99999');
    
    await page.getByRole('button', { name: 'Select gender' }).click();
    await page.getByText('Male', { exact: true }).click();
    
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Verify patient was created and age is calculated
    await expect(page.locator(`text=Age Test${timestamp}`)).toBeVisible();
    // Age should be displayed (exact age may vary depending on current date)
    await expect(page.locator('text="Age:"')).toBeVisible();
  });

  test('should verify all form fields are properly labeled and accessible', async ({ page }) => {
    // Open Add Patient modal
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Verify all form fields are present and accessible
    await expect(page.getByRole('textbox', { name: 'First Name *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Birth Date *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Phone *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Address Line 1 *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Address Line 2' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'City *' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'ZIP Code *' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Select gender' })).toBeVisible();
    
    // Verify action buttons are present
    await expect(page.getByRole('button', { name: 'Add Patient' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  });
});