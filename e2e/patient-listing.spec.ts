import { test, expect } from '@playwright/test';
import { PatientsPage } from './pages/patients.page';

test.describe('Patient Listing Tests', () => {
  let patientsPage: PatientsPage;

  test.beforeEach(async ({ page }) => {
    patientsPage = new PatientsPage(page);
    
    // Navigate directly to patients page (authentication is handled by stored session)
    await patientsPage.navigateTo();
    await patientsPage.waitForPageLoad();
  });

  test('should display patients list page with correct elements', async ({ page }) => {
    // Verify all page elements are present and correctly configured
    await patientsPage.verifyPageElements();
  });

  test('should display patient cards with correct information', async ({ page }) => {
    // Verify patient cards count
    await patientsPage.verifyPatientCardCount(3);
    
    // Verify first patient - Chamari Atapattu
    await patientsPage.verifyPatientCardDetails('Chamari Atapattu', {
      initials: 'CA',
      age: 'Age: 31',
      email: 'chamari.atapattu@gmail.com',
      gender: 'Gender: Female',
      phone: 'Phone: 0711212125',
      city: 'City: Galle'
    });
    
    // Verify second patient - Kusal Mendis
    await patientsPage.verifyPatientCardDetails('Kusal Mendis', {
      initials: 'KM',
      age: 'Age: 28',
      email: 'kusal.mendis@gmail.com',
      gender: 'Gender: Male',
      phone: 'Phone: 0711212124',
      city: 'City: Moratuwa'
    });
    
    // Verify third patient - Angelo Mathews
    await patientsPage.verifyPatientCardDetails('Angelo Mathews', {
      initials: 'AM',
      age: 'Age: 26',
      email: 'angelo.mathews@gmail.com',
      gender: 'Gender: Male',
      phone: 'Phone: 0711212123',
      city: 'City: Colombo'
    });
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
