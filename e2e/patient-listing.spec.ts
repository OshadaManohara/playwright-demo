import { test, expect } from '@playwright/test';
import { PatientsPage } from './pages/PatientsPage';

// Use the authenticated state
test.use({ storageState: 'e2e/.auth/user.json' });

test.describe('Patient Listing Tests', () => {
  let patientsPage: PatientsPage;

  test.beforeEach(async ({ page }) => {
    patientsPage = new PatientsPage(page);
    // Navigate directly to patients page (authentication is already loaded from storage)
    await patientsPage.goto();
  });

  test('should display patients list page with correct elements', async ({ page }) => {
    // Verify page title, description, and key elements
    await patientsPage.verifyPageElements();
  });

  test('should display patient cards with correct information', async ({ page }) => {
    // Verify patient cards are displayed
    await patientsPage.verifyPatientCardsCount(3);
    
    // Verify first patient - Chamari Atapattu
    await patientsPage.verifyPatientCardDetails({
      name: 'Chamari Atapattu',
      initials: 'CA',
      age: '31',
      email: 'chamari.atapattu@gmail.com',
      gender: 'Female',
      phone: '0711212125',
      city: 'Galle'
    });
    
    // Verify second patient - Kusal Mendis
    await patientsPage.verifyPatientCardDetails({
      name: 'Kusal Mendis',
      initials: 'KM',
      age: '28',
      email: 'kusal.mendis@gmail.com',
      gender: 'Male',
      phone: '0711212124',
      city: 'Moratuwa'
    });
    
    // Verify third patient - Angelo Mathews
    await patientsPage.verifyPatientCardDetails({
      name: 'Angelo Mathews',
      initials: 'AM',
      age: '26',
      email: 'angelo.mathews@gmail.com',
      gender: 'Male',
      phone: '0711212123',
      city: 'Colombo'
    });
  });

  test('should handle view patient button functionality', async ({ page }) => {
    // Setup console listener to capture the log message
    const consoleMessages = await patientsPage.setupConsoleListener();
    
    // Click view button for Chamari Atapattu
    await patientsPage.clickViewPatientButton('Chamari Atapattu');
    
    // Verify the console log was triggered (indicates the view function was called)
    await page.waitForTimeout(100); // Small wait for console message
    expect(consoleMessages.some(msg => msg.includes('View patient details'))).toBeTruthy();
    
    // Click view button for Kusal Mendis
    await patientsPage.clickViewPatientButton('Kusal Mendis');
    
    // Click view button for Angelo Mathews
    await patientsPage.clickViewPatientButton('Angelo Mathews');
    
    // Verify multiple view actions were logged
    await page.waitForTimeout(100);
    expect(consoleMessages.length).toBeGreaterThanOrEqual(3);
  });
});