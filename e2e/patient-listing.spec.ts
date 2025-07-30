import { test, expect } from '@playwright/test';

test.describe('Patient Listing Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:3001');
    
    // Login with provided credentials
    await page.getByTestId('email-input').fill('sahan.amarsha+test2@rootcode.io');
    await page.getByTestId('password-input').fill('Test@123');
    await page.getByTestId('login-submit-button').click();
    
    // Wait for successful login and navigation to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // Navigate to patients page
    await page.getByTestId('nav-patients').click();
    await expect(page).toHaveURL(/.*\/dashboard\/patients/);
  });

  test('should display patients list page with correct elements', async ({ page }) => {
    // Verify page title and description
    await expect(page.getByRole('heading', { name: 'Patients', level: 1 })).toBeVisible();
    await expect(page.getByText('Manage and monitor your patients\' health information')).toBeVisible();
    
    // Verify Add Patient button is present
    await expect(page.getByRole('button', { name: 'Add Patient' })).toBeVisible();
    
    // Verify search input is present
    await expect(page.getByTestId('patients-search-input')).toBeVisible();
    await expect(page.getByTestId('patients-search-input')).toHaveAttribute('placeholder', 'Search patients by name or email...');
  });

  test('should display patient cards with correct information', async ({ page }) => {
    // Verify patient cards are displayed
    const patientCards = page.getByTestId('patient-card');
    await expect(patientCards).toHaveCount(3);
    
    // Verify first patient - Chamari Atapattu
    const chamariCard = page.getByTestId('patients-grid').locator('div').filter({ hasText: 'Chamari Atapattu' });
    await expect(chamariCard.getByText('CA')).toBeVisible(); // Avatar initials
    await expect(chamariCard.getByRole('heading', { name: 'Chamari Atapattu' })).toBeVisible();
    await expect(chamariCard.getByText('Age: 31')).toBeVisible();
    await expect(chamariCard.getByText('chamari.atapattu@gmail.com')).toBeVisible();
    await expect(chamariCard.getByText('Gender: Female')).toBeVisible();
    await expect(chamariCard.getByText('Phone: 0711212125')).toBeVisible();
    await expect(chamariCard.getByText('City: Galle')).toBeVisible();
    await expect(chamariCard.getByTestId('view-patient-button')).toBeVisible();
    
    // Verify second patient - Kusal Mendis
    const kusalCard = page.getByTestId('patients-grid').locator('div').filter({ hasText: 'Kusal Mendis' });
    await expect(kusalCard.getByText('KM')).toBeVisible(); // Avatar initials
    await expect(kusalCard.getByRole('heading', { name: 'Kusal Mendis' })).toBeVisible();
    await expect(kusalCard.getByText('Age: 28')).toBeVisible();
    await expect(kusalCard.getByText('kusal.mendis@gmail.com')).toBeVisible();
    await expect(kusalCard.getByText('Gender: Male')).toBeVisible();
    await expect(kusalCard.getByText('Phone: 0711212124')).toBeVisible();
    await expect(kusalCard.getByText('City: Moratuwa')).toBeVisible();
    await expect(kusalCard.getByTestId('view-patient-button')).toBeVisible();
    
    // Verify third patient - Angelo Mathews
    const angeloCard = page.getByTestId('patients-grid').locator('div').filter({ hasText: 'Angelo Mathews' });
    await expect(angeloCard.getByText('AM')).toBeVisible(); // Avatar initials
    await expect(angeloCard.getByRole('heading', { name: 'Angelo Mathews' })).toBeVisible();
    await expect(angeloCard.getByText('Age: 26')).toBeVisible();
    await expect(angeloCard.getByText('angelo.mathews@gmail.com')).toBeVisible();
    await expect(angeloCard.getByText('Gender: Male')).toBeVisible();
    await expect(angeloCard.getByText('Phone: 0711212123')).toBeVisible();
    await expect(angeloCard.getByText('City: Colombo')).toBeVisible();
    await expect(angeloCard.getByTestId('view-patient-button')).toBeVisible();
  });

  test('should handle view patient button functionality', async ({ page }) => {
    // Setup console listener to capture the log message
    const consoleMessages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log' && msg.text().includes('View patient details')) {
        consoleMessages.push(msg.text());
      }
    });
    
    // Click view button for Chamari Atapattu
    const chamariCard = page.getByTestId('patients-grid').locator('div').filter({ hasText: 'Chamari Atapattu' });
    await chamariCard.getByTestId('view-patient-button').click();
    
    // Verify the console log was triggered (indicates the view function was called)
    await page.waitForTimeout(100); // Small wait for console message
    expect(consoleMessages.some(msg => msg.includes('View patient details'))).toBeTruthy();
    
    // Click view button for Kusal Mendis
    const kusalCard = page.getByTestId('patients-grid').locator('div').filter({ hasText: 'Kusal Mendis' });
    await kusalCard.getByTestId('view-patient-button').click();
    
    // Click view button for Angelo Mathews
    const angeloCard = page.getByTestId('patients-grid').locator('div').filter({ hasText: 'Angelo Mathews' });
    await angeloCard.getByTestId('view-patient-button').click();
    
    // Verify multiple view actions were logged
    await page.waitForTimeout(100);
    expect(consoleMessages.length).toBeGreaterThanOrEqual(3);
  });
});
