import { test, expect } from "@playwright/test";

test.describe("Login Tests", () => {
  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("http://localhost:3001/");

    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").fill("pasindu.silva@rootcode.io");
    await page.getByTestId("email-input").press("Tab");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("2iSYLkUOgWRvIJL");
    await page.getByTestId("login-submit-button").click();
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").press("ArrowLeft");
    await page.getByTestId("email-input").press("ArrowLeft");
    await page.getByTestId("email-input").press("ArrowLeft");
    await page.getByTestId("email-input").fill("pasindu.silva@rootcodelabs.io");
    await page.getByTestId("login-submit-button").click();
    await page.getByTestId("email-input").click();
    await page.getByTestId("email-input").press("ControlOrMeta+z");
    await page.getByTestId("email-input").fill("pasindu.silva@rootcodel.io");
    await page.getByTestId("email-input").press("ControlOrMeta+z");
    await page.getByTestId("email-input").fill("pasindu.silva@rootcode.io");
    await page.getByTestId("email-input").click();
    await page.getByTestId("login-submit-button").click();

    await expect(page.getByTestId("form-message")).toHaveText(
      "Invalid login credentials"
    );
  });

  test("should successfully login with valid credentials - Happy Path", async ({ page }) => {
    // Navigate to the login page
    await page.goto("http://localhost:3001/");

    // Verify we're on the login page
    await expect(page.getByText("Sign In")).toBeVisible();
    await expect(page.getByText("Enter your email and password to access your account")).toBeVisible();

    // Fill in valid credentials
    await page.getByTestId("email-input").fill("sahan.amarsha+test2@rootcode.io");
    await page.getByTestId("password-input").fill("Test@123");

    // Click login button
    await page.getByTestId("login-submit-button").click();

    // Verify successful login by checking URL and dashboard elements
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // Verify dashboard page elements are visible
    await expect(page.getByRole("heading", { name: "Dashboard", level: 1 })).toBeVisible();
    await expect(page.getByText("Admin")).toBeVisible();
    
    // Verify navigation menu is present
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Patients" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Activities" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Notifications" })).toBeVisible();
    
    // Verify logout button is present
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
  });
});
