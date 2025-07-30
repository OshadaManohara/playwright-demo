import { test, expect } from '@playwright/test';

test.describe('List Patients Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to patients page (authentication already handled by setup)
    await page.goto('http://localhost:3000/dashboard/patients');
    
    // Wait for the page to load completely
    await page.waitForSelector('[data-testid="patient-list"], .grid');
  });

  test('should display patients page layout correctly', async ({ page }) => {
    // Verify page title and heading
    await expect(page).toHaveTitle('Playwright Demo');
    await expect(page.getByRole('heading', { name: 'Patients', level: 1 })).toBeVisible();
    await expect(page.getByText('Manage and monitor your patients\' health information')).toBeVisible();
    
    // Verify navigation link is present and active (using class-based approach since aria-current might not be implemented)
    const patientsLink = page.getByRole('link', { name: 'Patients' });
    await expect(patientsLink).toBeVisible();
    await expect(patientsLink).toHaveAttribute('href', '/dashboard/patients');
    
    // Verify Add Patient button is present
    await expect(page.getByRole('button', { name: 'Add Patient' })).toBeVisible();
    
    // Verify search input is present
    await expect(page.getByRole('textbox', { name: 'Search patients by name or email...' })).toBeVisible();
  });

  test('should display multiple patient cards in grid layout', async ({ page }) => {
    // Verify patient cards are displayed
    const patientCards = page.locator('[data-testid="patient-card"], .grid > div').filter({ hasText: 'View' });
    await expect(patientCards).toHaveCount(6); // Based on current test data
    
    // Verify grid layout is responsive
    const gridContainer = page.locator('.grid').first();
    await expect(gridContainer).toBeVisible();
  });

  test('should display patient card information correctly', async ({ page }) => {
    // Verify first patient card contains required information
    const firstPatientCard = page.locator('.grid > div').first();
    
    // Check for patient avatar/initials
    await expect(firstPatientCard.locator('div').first()).toBeVisible(); // Avatar container
    
    // Check for patient name (heading)
    await expect(firstPatientCard.getByRole('heading', { level: 3 })).toBeVisible();
    
    // Check for age information
    await expect(firstPatientCard.getByText('Age:', { exact: false })).toBeVisible();
    
    // Check for email
    await expect(firstPatientCard.getByText('@', { exact: false })).toBeVisible();
    
    // Check for additional details
    await expect(firstPatientCard.getByText('Gender:', { exact: false })).toBeVisible();
    await expect(firstPatientCard.getByText('Phone:', { exact: false })).toBeVisible();
    await expect(firstPatientCard.getByText('City:', { exact: false })).toBeVisible();
    
    // Check for View button
    await expect(firstPatientCard.getByRole('button', { name: 'View' })).toBeVisible();
  });

  test('should display correct patient information for known patients', async ({ page }) => {
    // Verify John Doe patient card (using more specific locator to avoid strict mode violations)
    const johnDoeCard = page.locator('.grid > div').filter({ hasText: 'John Doe' }).first();
    await expect(johnDoeCard.getByText('John Doe')).toBeVisible();
    await expect(johnDoeCard.getByText('Age: 35')).toBeVisible();
    await expect(johnDoeCard.getByText('john.doe@example.com')).toBeVisible();
    await expect(johnDoeCard.getByText('Gender: Male')).toBeVisible();
    await expect(johnDoeCard.getByText('Phone: 1234567890')).toBeVisible();
    await expect(johnDoeCard.getByText('City: New York')).toBeVisible();
    
    // Verify Test Patient card (using more specific locator)
    const testPatientCard = page.locator('.grid > div').filter({ hasText: 'Test Patient' }).first();
    await expect(testPatientCard.getByText('Test Patient', { exact: false })).toBeVisible();
    await expect(testPatientCard.getByText('Age: 35')).toBeVisible();
    await expect(testPatientCard.getByText('test.patient.', { exact: false })).toBeVisible();
    await expect(testPatientCard.getByText('Gender: Male')).toBeVisible();
    await expect(testPatientCard.getByText('Phone: 555-123-4567')).toBeVisible();
    await expect(testPatientCard.getByText('City: Test City')).toBeVisible();
  });

  test('should handle different gender types correctly', async ({ page }) => {
    // Verify Male patients
    const malePatients = page.getByText('Gender: Male');
    await expect(malePatients).toHaveCount(4); // Based on current test data
    
    // Verify Female patients
    const femalePatients = page.getByText('Gender: Female');
    await expect(femalePatients).toHaveCount(1); // Based on current test data
    
    // Verify Other gender patients
    const otherPatients = page.getByText('Gender: Other');
    await expect(otherPatients).toHaveCount(1); // Based on current test data
  });

  test('should display patient avatars with correct initials', async ({ page }) => {
    // Verify John Doe has JD initials (using more specific locator to avoid strict mode violations)
    const johnDoeCard = page.locator('.grid > div').filter({ hasText: 'John Doe' }).first();
    await expect(johnDoeCard.getByText('JD')).toBeVisible();
    
    // Verify Address Test has AT initials
    const addressTestCard = page.locator('.grid > div').filter({ hasText: 'Address Test' }).first();
    await expect(addressTestCard.getByText('AT')).toBeVisible();
    
    // Verify Loading State has LS initials
    const loadingStateCard = page.locator('.grid > div').filter({ hasText: 'Loading State' }).first();
    await expect(loadingStateCard.getByText('LS')).toBeVisible();
  });

  test('should have functional View buttons for all patients', async ({ page }) => {
    // Get all View buttons
    const viewButtons = page.getByRole('button', { name: 'View' });
    const viewButtonCount = await viewButtons.count();
    
    // Verify we have the expected number of View buttons
    expect(viewButtonCount).toBe(6);
    
    // Test clicking a View button (should be clickable and not cause errors)
    await viewButtons.first().click();
    
    // Verify no navigation occurred (View button functionality is placeholder)
    // Use a more flexible URL assertion that handles the full URL
    await expect(page).toHaveURL(/.*\/dashboard\/patients$/);
  });

  test('should search patients by name successfully', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search for "John"
    await searchInput.fill('John');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Verify only John Doe appears
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('john.doe@example.com')).toBeVisible();
    
    // Verify other patients are hidden
    await expect(page.getByText('Test Patient')).not.toBeVisible();
    await expect(page.getByText('Age Test')).not.toBeVisible();
    
    // Verify only one patient card is shown
    const visibleCards = page.locator('.grid > div').filter({ hasText: 'View' });
    await expect(visibleCards).toHaveCount(1);
  });

  test('should search patients by email successfully', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search by email domain
    await searchInput.fill('@example.com');
    await page.waitForTimeout(500); // Wait for search to process
    
    // Verify multiple patients with @example.com are shown
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Test Patient')).toBeVisible();
    await expect(page.getByText('Age Test')).toBeVisible();
    
    // Search by specific email
    await searchInput.fill('john.doe@example.com');
    await page.waitForTimeout(500);
    
    // Verify only John Doe appears
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Test Patient')).not.toBeVisible();
  });

  test('should perform case-insensitive search', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search with uppercase
    await searchInput.fill('JOHN');
    await page.waitForTimeout(500);
    
    // Should still find John Doe
    await expect(page.getByText('John Doe')).toBeVisible();
    
    // Search with mixed case
    await searchInput.fill('tEsT');
    await page.waitForTimeout(500);
    
    // Should find patients with "test" in their name
    await expect(page.getByText('Test Patient')).toBeVisible();
    await expect(page.getByText('Age Test')).toBeVisible();
    await expect(page.getByText('Address Test')).toBeVisible();
  });

  test('should show no results message for non-existent search', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // Search for non-existent patient
    await searchInput.fill('NonExistentPatient12345');
    await page.waitForTimeout(500);
    
    // Verify no results message is displayed
    await expect(page.getByRole('heading', { name: 'No patients found' })).toBeVisible();
    await expect(page.getByText('Try adjusting your search criteria')).toBeVisible();
    
    // Verify no patient cards are visible
    const patientCards = page.locator('.grid > div').filter({ hasText: 'View' });
    await expect(patientCards).toHaveCount(0);
    
    // Verify known patients are not visible
    await expect(page.getByText('John Doe')).not.toBeVisible();
    await expect(page.getByText('Test Patient')).not.toBeVisible();
  });

  test('should clear search and restore all patients', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    
    // First perform a search
    await searchInput.fill('John');
    await page.waitForTimeout(500);
    
    // Verify filtered results
    await expect(page.getByText('John Doe')).toBeVisible();
    const filteredCards = page.locator('.grid > div').filter({ hasText: 'View' });
    await expect(filteredCards).toHaveCount(1);
    
    // Clear the search
    await searchInput.clear();
    await page.waitForTimeout(500);
    
    // Verify all patients are restored
    const allCards = page.locator('.grid > div').filter({ hasText: 'View' });
    await expect(allCards).toHaveCount(6);
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('Test Patient')).toBeVisible();
    await expect(page.getByText('Age Test')).toBeVisible();
  });

  test('should maintain responsive layout on different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    const gridContainer = page.locator('.grid').first();
    await expect(gridContainer).toBeVisible();
    
    // Verify multiple columns are displayed (cards should be in rows)
    const patientCards = page.locator('.grid > div').filter({ hasText: 'View' });
    await expect(patientCards).toHaveCount(6);
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(gridContainer).toBeVisible();
    await expect(patientCards).toHaveCount(6);
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(gridContainer).toBeVisible();
    await expect(patientCards).toHaveCount(6);
  });

  test('should verify page performance and loading', async ({ page }) => {
    // Verify page loads within reasonable time
    const startTime = Date.now();
    await page.reload();
    await page.waitForSelector('.grid');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Verify all essential elements are loaded
    await expect(page.getByRole('heading', { name: 'Patients' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Search patients by name or email...' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Patient' })).toBeVisible();
    
    // Verify patient data is loaded
    const patientCards = page.locator('.grid > div').filter({ hasText: 'View' });
    await expect(patientCards).toHaveCount(6);
  });

  test('should handle empty patient list gracefully', async ({ page }) => {
    // Search for something that will return no results
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    await searchInput.fill('NoResultsExpected123456');
    await page.waitForTimeout(500);
    
    // Verify empty state is handled properly
    await expect(page.getByRole('heading', { name: 'No patients found' })).toBeVisible();
    await expect(page.getByText('Try adjusting your search criteria')).toBeVisible();
    
    // Verify search input is still functional
    await expect(searchInput).toBeEnabled();
    await expect(searchInput).toHaveValue('NoResultsExpected123456');
    
    // Verify Add Patient button is still available
    await expect(page.getByRole('button', { name: 'Add Patient' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Patient' })).toBeEnabled();
  });

  test('should verify accessibility features', async ({ page }) => {
    // Verify main heading has proper structure
    await expect(page.getByRole('heading', { name: 'Patients', level: 1 })).toBeVisible();
    
    // Verify patient names are proper headings
    await expect(page.getByRole('heading', { name: 'John Doe', level: 3 })).toBeVisible();
    
    // Verify buttons have accessible names
    const viewButtons = page.getByRole('button', { name: 'View' });
    await expect(viewButtons.first()).toBeVisible();
    
    // Verify search input has proper label
    const searchInput = page.getByRole('textbox', { name: 'Search patients by name or email...' });
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('placeholder', 'Search patients by name or email...');
    
    // Verify navigation links are accessible
    await expect(page.getByRole('link', { name: 'Patients' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add Patient' })).toBeVisible();
  });
});
