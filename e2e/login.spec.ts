import { test, expect } from "@playwright/test";

test("Login to the system", async ({ page }) => {
  await page.goto("http://localhost:3000/");

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

test("Verify login using correct username and password", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByTestId("email-input").click();
  await page.getByTestId("email-input").fill("osadamanohara@gmail.com");
  await page.getByTestId("email-input").press("Tab");
  await page.getByTestId("password-input").fill("Osaninja123");
  await page.getByTestId("login-submit-button").click();
});
