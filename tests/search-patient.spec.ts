import { test, expect } from '@playwright/test';

test.describe('Search Patient Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to patients page (authentication already handled by setup)
    await page.goto('http://localhost:3000/dashboard/patients');
    
    // Wait for the page to load completely
    await page.waitForSelector('[data-testid="patient-list"], .grid');
  });

  test('should display search input field', async ({ page }) => {
    // Verify search input is visible and has correct placeholder
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Search patients by name or email...');
  });

  test('should display all patients when search is empty', async ({ page }) => {
    // Verify that multiple patients are displayed when no search is applied
    const patientCards = page.locator('[data-testid="patient-card"], .grid > div');
    await expect(patientCards).toHaveCount(6); // Based on the patients we saw in testing
    
    // Verify some known patients are visible
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Test Patient')).toBeVisible();
    await expect(page.getByText('Searchable Patient')).toBeVisible();
  });

  test('should search patients by name (partial match)', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search for "John" (partial name match)
    await searchInput.fill('John');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Verify only John Doe appears in results
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('john.doe@example.com')).toBeVisible();
    
    // Verify other patients are not visible
    await expect(page.getByText('Test Patient')).not.toBeVisible();
    await expect(page.getByText('Searchable Patient')).not.toBeVisible();
  });

  test('should search patients by email (partial match)', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search for "searchable" (partial email match)
    await searchInput.fill('searchable');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Verify only the patient with "searchable" in email appears
    await expect(page.getByText('Searchable Patient')).toBeVisible();
    await expect(page.getByText('searchable.', { exact: false })).toBeVisible();
    
    // Verify other patients are not visible
    await expect(page.getByText('John Doe')).not.toBeVisible();
    await expect(page.getByText('Test Patient')).not.toBeVisible();
  });

  test('should search patients by full email', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search for complete email address
    await searchInput.fill('john.doe@example.com');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Verify only John Doe appears in results
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('john.doe@example.com')).toBeVisible();
    
    // Verify other patients are not visible
    await expect(page.getByText('Test Patient')).not.toBeVisible();
    await expect(page.getByText('Searchable Patient')).not.toBeVisible();
  });

  test('should perform case-insensitive search', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search with uppercase "TEST" to verify case-insensitive matching
    await searchInput.fill('TEST');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Should find patients with "test" in their name (case-insensitive)
    await expect(page.getByText('Age Test')).toBeVisible();
    await expect(page.getByText('Address Test')).toBeVisible();
    await expect(page.getByText('Test Patient')).toBeVisible();
    
    // Should not find John Doe since "test" is not in his name or email
    await expect(page.getByText('John Doe')).not.toBeVisible();
  });

  test('should clear search results when input is cleared', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // First perform a search to filter results
    await searchInput.fill('John');
    await page.waitForTimeout(500);
    
    // Verify filtered results
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Test Patient')).not.toBeVisible();
    
    // Clear the search input
    await searchInput.clear();
    await page.waitForTimeout(500);
    
    // Verify all patients are shown again
    const patientCards = page.locator('[data-testid="patient-card"], .grid > div');
    await expect(patientCards).toHaveCount(6);
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Test Patient')).toBeVisible();
    await expect(page.getByText('Searchable Patient')).toBeVisible();
  });

  test('should show no results for non-existent search term', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search for something that doesn't exist
    await searchInput.fill('NonExistentPatient12345');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Verify no patient cards are visible
    const patientCards = page.locator('[data-testid="patient-card"], .grid > div');
    await expect(patientCards).toHaveCount(0);
    
    // Verify known patients are not visible
    await expect(page.getByText('John Doe')).not.toBeVisible();
    await expect(page.getByText('Test Patient')).not.toBeVisible();
    await expect(page.getByText('Searchable Patient')).not.toBeVisible();
  });

  test('should maintain search functionality after adding a new patient', async ({ page }) => {
    // First perform a search to verify current functionality
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    await searchInput.fill('John');
    await page.waitForTimeout(500);
    await expect(page.getByText('John Doe')).toBeVisible();
    
    // Clear search to show all patients
    await searchInput.clear();
    await page.waitForTimeout(500);
    
    // Add a new patient
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Fill in the add patient form
    await page.getByRole('textbox', { name: 'Full Name' }).fill('Search Test Patient');
    await page.getByRole('textbox', { name: 'Email' }).fill('search.test@example.com');
    await page.getByRole('textbox', { name: 'Phone' }).fill('1112223333');
    await page.getByRole('textbox', { name: 'Age' }).fill('30');
    await page.getByRole('combobox', { name: 'Gender' }).click();
    await page.getByRole('option', { name: 'Male' }).click();
    await page.getByRole('textbox', { name: 'Address' }).fill('123 Search St');
    await page.getByRole('textbox', { name: 'City' }).fill('Search City');
    await page.getByRole('button', { name: 'Add Patient' }).click();
    
    // Wait for modal to close and page to update
    await page.waitForTimeout(1000);
    
    // Test search functionality with the newly added patient
    await searchInput.fill('Search Test');
    await page.waitForTimeout(500);
    
    // Verify the new patient appears in search results
    await expect(page.getByText('Search Test Patient')).toBeVisible();
    await expect(page.getByText('search.test@example.com')).toBeVisible();
    
    // Verify other patients are filtered out
    await expect(page.getByText('John Doe')).not.toBeVisible();
  });

  test('should search by partial email domain', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search for "@example.com" to find patients with this domain
    await searchInput.fill('@example.com');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Should find multiple patients with @example.com emails
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Test Patient')).toBeVisible();
    await expect(page.getByText('Searchable Patient')).toBeVisible();
    
    // All visible patients should have @example.com in their email
    await expect(page.getByText('john.doe@example.com')).toBeVisible();
    await expect(page.getByText('@example.com', { exact: false })).toHaveCount(6); // Multiple matches
  });

  test('should handle special characters in search', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search for email with dots and special characters
    await searchInput.fill('john.doe');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Should find John Doe patient
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('john.doe@example.com')).toBeVisible();
    
    // Should not find other patients
    await expect(page.getByText('Test Patient')).not.toBeVisible();
  });
});
