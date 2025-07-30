import { test, expect } from '@playwright/test';

test.describe('Search Patient Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to patients page (authentication is handled by stored session)
    await page.goto('http://localhost:3001/dashboard/patients');
    
    // Wait for the page to load and verify we're on the patients page
    await expect(page).toHaveURL(/.*\/dashboard\/patients/);
    
    // Verify search input is available
    await expect(page.getByTestId('patients-search-input')).toBeVisible();
  });

  test('should display all patients by default', async ({ page }) => {
    // Verify search input is empty initially
    await expect(page.getByTestId('patients-search-input')).toHaveValue('');
    
    // Verify all 3 patients are displayed by default
    const patientCards = page.getByTestId('patient-card');
    await expect(patientCards).toHaveCount(3);
    
    // Verify each patient is visible
    await expect(page.getByText('Chamari Atapattu')).toBeVisible();
    await expect(page.getByText('chamari.atapattu@gmail.com')).toBeVisible();
    
    await expect(page.getByText('Kusal Mendis')).toBeVisible();
    await expect(page.getByText('kusal.mendis@gmail.com')).toBeVisible();
    
    await expect(page.getByText('Angelo Mathews')).toBeVisible();
    await expect(page.getByText('angelo.mathews@gmail.com')).toBeVisible();
  });

  test('should search patients by name correctly', async ({ page }) => {
    const searchInput = page.getByTestId('patients-search-input');
    const patientCards = page.getByTestId('patient-card');
    
    // Search for "Chamari" - should show only Chamari Atapattu
    await searchInput.fill('Chamari');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Chamari Atapattu')).toBeVisible();
    await expect(page.getByText('Kusal Mendis')).not.toBeVisible();
    await expect(page.getByText('Angelo Mathews')).not.toBeVisible();
    
    // Search for "Kusal" - should show only Kusal Mendis
    await searchInput.fill('Kusal');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Kusal Mendis')).toBeVisible();
    await expect(page.getByText('Chamari Atapattu')).not.toBeVisible();
    await expect(page.getByText('Angelo Mathews')).not.toBeVisible();
    
    // Search for "Angelo" - should show only Angelo Mathews
    await searchInput.fill('Angelo');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Angelo Mathews')).toBeVisible();
    await expect(page.getByText('Chamari Atapattu')).not.toBeVisible();
    await expect(page.getByText('Kusal Mendis')).not.toBeVisible();
    
    // Search for partial name "Mat" - should show Angelo Mathews
    await searchInput.fill('Mat');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Angelo Mathews')).toBeVisible();
    
    // Clear search - should show all patients again
    await searchInput.fill('');
    await expect(patientCards).toHaveCount(3);
    await expect(page.getByText('Chamari Atapattu')).toBeVisible();
    await expect(page.getByText('Kusal Mendis')).toBeVisible();
    await expect(page.getByText('Angelo Mathews')).toBeVisible();
  });

  test('should search patients by email correctly', async ({ page }) => {
    const searchInput = page.getByTestId('patients-search-input');
    const patientCards = page.getByTestId('patient-card');
    
    // Search by full email - chamari.atapattu@gmail.com
    await searchInput.fill('chamari.atapattu@gmail.com');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Chamari Atapattu')).toBeVisible();
    await expect(page.getByText('chamari.atapattu@gmail.com')).toBeVisible();
    await expect(page.getByText('Kusal Mendis')).not.toBeVisible();
    await expect(page.getByText('Angelo Mathews')).not.toBeVisible();
    
    // Search by full email - kusal.mendis@gmail.com
    await searchInput.fill('kusal.mendis@gmail.com');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Kusal Mendis')).toBeVisible();
    await expect(page.getByText('kusal.mendis@gmail.com')).toBeVisible();
    await expect(page.getByText('Chamari Atapattu')).not.toBeVisible();
    await expect(page.getByText('Angelo Mathews')).not.toBeVisible();
    
    // Search by full email - angelo.mathews@gmail.com
    await searchInput.fill('angelo.mathews@gmail.com');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Angelo Mathews')).toBeVisible();
    await expect(page.getByText('angelo.mathews@gmail.com')).toBeVisible();
    await expect(page.getByText('Chamari Atapattu')).not.toBeVisible();
    await expect(page.getByText('Kusal Mendis')).not.toBeVisible();
    
    // Search by partial email - "atapattu"
    await searchInput.fill('atapattu');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Chamari Atapattu')).toBeVisible();
    
    // Search by partial email - "mendis"
    await searchInput.fill('mendis');
    await expect(patientCards).toHaveCount(1);
    await expect(page.getByText('Kusal Mendis')).toBeVisible();
    
    // Search by common domain - "gmail.com" (should show all patients)
    await searchInput.fill('gmail.com');
    await expect(patientCards).toHaveCount(3);
    await expect(page.getByText('Chamari Atapattu')).toBeVisible();
    await expect(page.getByText('Kusal Mendis')).toBeVisible();
    await expect(page.getByText('Angelo Mathews')).toBeVisible();
    
    // Clear search - should show all patients again
    await searchInput.fill('');
    await expect(patientCards).toHaveCount(3);
    await expect(page.getByText('Chamari Atapattu')).toBeVisible();
    await expect(page.getByText('Kusal Mendis')).toBeVisible();
    await expect(page.getByText('Angelo Mathews')).toBeVisible();
  });
});
