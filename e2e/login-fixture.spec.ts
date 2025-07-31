// login-failure.spec.ts
import { loginTest, expect, invalidCredentials } from "./fixtures";

loginTest.describe("Login Failure Test", () => {
  invalidCredentials.forEach((data, index) => {
    loginTest(
      `Test ${index + 1}: should show error for ${data.description}`,
      async ({ page, credential }) => {
        const { email, password } = credential;

        await page.goto("http://localhost:3000/");
        await expect(page).toHaveTitle("Playwright Demo");

        await page.getByTestId("email-input").fill(email);
        await page.getByTestId("password-input").fill(password);
        await page.getByTestId("login-submit-button").click();

        await expect(page.getByText("Invalid login credentials")).toBeVisible();
        await expect(page).toHaveURL("http://localhost:3000/");
        await expect(page.getByTestId("email-input")).toHaveValue(email);
      }
    );
  });
});
