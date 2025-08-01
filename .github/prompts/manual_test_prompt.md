# Manual Testing Prompt for Login Functionality

You are a manual tester using Playwright MCP Server to test the login functionality of a web application. Follow these test scenarios step by step and verify the expected outcomes.

## Test Environment Setup
- Application URL: `http://localhost:3000/`
- Use Playwright MCP Server tools to navigate and interact with the application
- Follow each step carefully and verify the expected results

## Test Scenario 1: Invalid Login Credentials (Negative Test)

### Test Steps:
1. Navigate to `http://localhost:3000/`
2. Verify the login page loads with:
   - "Sign In" heading is visible
   - "Enter your email and password to access your account" description is visible
   - Email input field is present
   - Password input field is present
   - "Sign In" button is present

3. Click on the email input field
4. Fill the email field with: `pasindu.silva@rootcode.io`
5. Press Tab key to move to password field
6. Click on the password input field
7. Fill the password field with: `2iSYLkUOgWRvIJL`
8. Click the "Sign In" button

9. Click on the email input field again
10. Press Arrow Left key 3 times
11. Change the email to: `pasindu.silva@rootcodelabs.io`
12. Click the "Sign In" button

13. Click on the email input field
14. Press Ctrl+Z (or Cmd+Z on Mac) to undo
15. Change the email to: `pasindu.silva@rootcodel.io`
16. Press Ctrl+Z (or Cmd+Z on Mac) to undo again
17. Change the email back to: `pasindu.silva@rootcode.io`
18. Click on the email input field
19. Click the "Sign In" button

### Expected Result:
- An error message should be displayed with the text: "Invalid login credentials"
- The user should remain on the login page
- No navigation to dashboard should occur

---

## Test Scenario 2: Valid Login Credentials - Happy Path (Positive Test)

### Test Steps:
1. Navigate to `http://localhost:3000/`
2. Verify the login page loads correctly:
   - "Sign In" heading is visible
   - "Enter your email and password to access your account" description is visible

3. Fill the email input field with: `sahan.amarsha+test2@rootcode.io`
4. Fill the password input field with: `Test@123`
5. Click the "Sign In" button

### Expected Results:
1. **Successful Navigation:**
   - URL should change to match the pattern `/dashboard` (e.g., `http://localhost:3000/dashboard`)

2. **Dashboard Page Elements Should Be Visible:**
   - "Dashboard" heading (level 1) should be displayed
   - "Admin" text should be visible in the header area

3. **Navigation Menu Should Be Present:**
   - "Dashboard" link should be visible
   - "Patients" link should be visible  
   - "Activities" link should be visible
   - "Notifications" link should be visible

4. **User Controls:**
   - "Logout" button should be visible and accessible

### Success Criteria:
- Login process completes without errors
- User is successfully redirected to the dashboard
- All dashboard elements are properly loaded and visible
- Navigation menu is functional and accessible

---

## Additional Verification Points:
- Check browser console for any JavaScript errors during the login process
- Verify that the login form handles user input correctly
- Ensure that the application responds appropriately to both valid and invalid credentials
- Confirm that the user interface is responsive and elements are properly aligned

## Notes for Manual Tester:
- Use the Playwright MCP Server tools to interact with page elements
- Take screenshots if any unexpected behavior occurs
- Document any deviations from expected results
- Verify that the application maintains security best practices (password masking, etc.)

---

## Test Report Generation

After completing all test scenarios, generate a comprehensive markdown test report and save it in the `.github/reports` directory with the filename format: `manual-test-report-YYYY-MM-DD-HHMMSS.md`

### Report Template:

```markdown
# Manual Testing Report - Login Functionality

**Test Date:** [Current Date and Time]
**Tester:** [AI Assistant/Manual Tester Name]
**Application URL:** http://localhost:3000/
**Browser:** [Browser Information from Playwright]

## Executive Summary
Brief overview of testing results and overall application status.

## Test Environment
- **Application URL:** http://localhost:3000/
- **Testing Tool:** Playwright MCP Server
- **Test Duration:** [Start Time] - [End Time]

## Test Scenarios Executed

### Test Scenario 1: Invalid Login Credentials (Negative Test)
**Status:** ✅ PASSED / ❌ FAILED
**Execution Time:** [Duration]

#### Test Steps Performed:
- [List each step with status]

#### Expected Results:
- [List expected outcomes]

#### Actual Results:
- [Document what actually happened]

#### Issues Found:
- [Any deviations or problems encountered]

#### Screenshots:
- [Include any screenshots taken during testing]

#### Console Messages:
- [Document any relevant console messages/errors]

---

### Test Scenario 2: Valid Login Credentials - Happy Path (Positive Test)
**Status:** ✅ PASSED / ❌ FAILED
**Execution Time:** [Duration]

#### Test Steps Performed:
- [List each step with status]

#### Expected Results:
- [List expected outcomes]

#### Actual Results:
- [Document what actually happened]

#### Issues Found:
- [Any deviations or problems encountered]

#### Screenshots:
- [Include any screenshots taken during testing]

#### Console Messages:
- [Document any relevant console messages/errors]

---

## Additional Verification Results

### Browser Console Analysis
- [Document any JavaScript errors or warnings]
- [Note any performance issues]

### User Interface Assessment
- [Confirm responsive design works correctly]
- [Verify element alignment and visual consistency]

### Security Verification
- [Confirm password masking is working]
- [Verify no sensitive data exposed in console]

## Summary of Findings

### ✅ Passed Tests
- [List all successful test scenarios]

### ❌ Failed Tests
- [List any failed test scenarios with details]

### ⚠️ Issues/Concerns
- [Document any concerns or recommendations]

## Recommendations
- [Provide suggestions for improvements]
- [Note any areas that need attention]

## Test Coverage
- **Login with invalid credentials:** ✅ / ❌
- **Login with valid credentials:** ✅ / ❌
- **Error message display:** ✅ / ❌
- **Successful navigation:** ✅ / ❌
- **Dashboard element verification:** ✅ / ❌
- **Navigation menu functionality:** ✅ / ❌
- **User controls accessibility:** ✅ / ❌

## Conclusion
[Overall assessment of the login functionality and readiness for production]
```

### Instructions for Report Generation:
1. Use the template above as a basis for your report
2. Fill in all sections with actual test results and observations
3. Include timestamps using the current date and time
4. Save the report in `.github/reports/` directory
5. Use descriptive filenames with timestamp: `manual-test-report-YYYY-MM-DD-HHMMSS.md`
6. Include any screenshots taken during testing
7. Document all console messages, errors, and warnings observed
8. Provide clear status indicators (✅ PASSED, ❌ FAILED, ⚠️ WARNING)
9. Include recommendations for any issues found