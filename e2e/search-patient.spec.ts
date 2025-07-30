import { test, expect } from '@playwright/test';
import { PatientsPage } from './pages/patients.page';

test.describe('Search Patient Tests', () => {
  let patientsPage: PatientsPage;

  test.beforeEach(async ({ page }) => {
    patientsPage = new PatientsPage(page);
    
    // Navigate directly to patients page (authentication is handled by stored session)
    await patientsPage.navigateTo();
    await patientsPage.waitForPageLoad();
  });

  test('should display all patients by default', async ({ page }) => {
    // Verify search input is empty initially
    await patientsPage.verifySearchInputEmpty();
    
    // Verify all 3 patients are displayed by default
    await patientsPage.verifyPatientCardCount(3);
    
    // Verify all patients are visible
    await patientsPage.verifyAllPatientsVisible();
  });

  test('should search patients by name correctly', async ({ page }) => {
    // Search for "Chamari" - should show only Chamari Atapattu
    await patientsPage.searchPatients('Chamari');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Chamari Atapattu');
    await patientsPage.verifyPatientNotVisible('Kusal Mendis');
    await patientsPage.verifyPatientNotVisible('Angelo Mathews');
    
    // Search for "Kusal" - should show only Kusal Mendis
    await patientsPage.searchPatients('Kusal');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Kusal Mendis');
    await patientsPage.verifyPatientNotVisible('Chamari Atapattu');
    await patientsPage.verifyPatientNotVisible('Angelo Mathews');
    
    // Search for "Angelo" - should show only Angelo Mathews
    await patientsPage.searchPatients('Angelo');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Angelo Mathews');
    await patientsPage.verifyPatientNotVisible('Chamari Atapattu');
    await patientsPage.verifyPatientNotVisible('Kusal Mendis');
    
    // Search for partial name "Mat" - should show Angelo Mathews
    await patientsPage.searchPatients('Mat');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Angelo Mathews');
    
    // Clear search - should show all patients again
    await patientsPage.clearSearch();
    await patientsPage.verifyPatientCardCount(3);
    await patientsPage.verifyAllPatientsVisible();
  });

  test('should search patients by email correctly', async ({ page }) => {
    // Search by full email - chamari.atapattu@gmail.com
    await patientsPage.searchPatients('chamari.atapattu@gmail.com');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Chamari Atapattu');
    await patientsPage.verifyEmailVisible('chamari.atapattu@gmail.com');
    await patientsPage.verifyPatientNotVisible('Kusal Mendis');
    await patientsPage.verifyPatientNotVisible('Angelo Mathews');
    
    // Search by full email - kusal.mendis@gmail.com
    await patientsPage.searchPatients('kusal.mendis@gmail.com');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Kusal Mendis');
    await patientsPage.verifyEmailVisible('kusal.mendis@gmail.com');
    await patientsPage.verifyPatientNotVisible('Chamari Atapattu');
    await patientsPage.verifyPatientNotVisible('Angelo Mathews');
    
    // Search by full email - angelo.mathews@gmail.com
    await patientsPage.searchPatients('angelo.mathews@gmail.com');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Angelo Mathews');
    await patientsPage.verifyEmailVisible('angelo.mathews@gmail.com');
    await patientsPage.verifyPatientNotVisible('Chamari Atapattu');
    await patientsPage.verifyPatientNotVisible('Kusal Mendis');
    
    // Search by partial email - "atapattu"
    await patientsPage.searchPatients('atapattu');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Chamari Atapattu');
    
    // Search by partial email - "mendis"
    await patientsPage.searchPatients('mendis');
    await patientsPage.verifyPatientCardCount(1);
    await patientsPage.verifyPatientVisible('Kusal Mendis');
    
    // Search by common domain - "gmail.com" (should show all patients)
    await patientsPage.searchPatients('gmail.com');
    await patientsPage.verifyPatientCardCount(3);
    await patientsPage.verifyAllPatientsVisible();
    
    // Clear search - should show all patients again
    await patientsPage.clearSearch();
    await patientsPage.verifyPatientCardCount(3);
    await patientsPage.verifyAllPatientsVisible();
  });
});
