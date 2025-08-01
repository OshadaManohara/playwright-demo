import { test, expect } from '@playwright/test';
import { PatientsPage } from './pages/PatientsPage';

// Use the authenticated state
test.use({ storageState: 'e2e/.auth/user.json' });

test.describe('Search Patient Functionality', () => {
  let patientsPage: PatientsPage;

  test.beforeEach(async ({ page }) => {
    patientsPage = new PatientsPage(page);
    // Navigate directly to patients page (authentication is already loaded from storage)
    await patientsPage.goto();
  });

  test('should render all patients by default', async ({ page }) => {
    // Verify that all 3 patients are visible by default
    await patientsPage.verifyAllPatientsVisible();
    
    // Verify the search input is empty
    await patientsPage.verifySearchInputEmpty();
  });

  test('should search patients by name successfully', async ({ page }) => {
    // Search for a patient by name
    await patientsPage.searchPatient('Chamari');
    
    // Verify only the matching patient is visible
    await patientsPage.verifyPatientVisible('Chamari Atapattu', 'chamari.atapattu@gmail.com');
    
    // Verify other patients are not visible
    await patientsPage.verifyPatientNotVisible('Kusal Mendis');
    await patientsPage.verifyPatientNotVisible('Angelo Mathews');
    
    // Clear search and verify all patients are shown again
    await patientsPage.clearSearch();
    await patientsPage.verifyAllPatientsVisible();
  });

  test('should search patients by email successfully', async ({ page }) => {
    // Search for a patient by email
    await patientsPage.searchPatient('kusal.mendis@gmail.com');
    
    // Verify only the matching patient is visible
    await patientsPage.verifyPatientVisible('Kusal Mendis', 'kusal.mendis@gmail.com');
    
    // Verify other patients are not visible
    await patientsPage.verifyPatientNotVisible('Chamari Atapattu');
    await patientsPage.verifyPatientNotVisible('Angelo Mathews');
    
    // Clear search and verify all patients are shown again
    await patientsPage.clearSearch();
    await patientsPage.verifyAllPatientsVisible();
  });
});
