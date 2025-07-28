# Test IDs Reference

This document lists all the `data-testid` attributes added throughout the application for automated testing purposes.

## UI Components

### Button Component

- `button` - All button elements

### Input Component

- `input` - All input elements

### Card Components

- `card` - Card wrapper
- `card-header` - Card header section
- `card-title` - Card title
- `card-description` - Card description
- `card-content` - Card content area
- `card-footer` - Card footer

### Dialog Components

- `dialog` - Dialog wrapper
- `dialog-content` - Dialog content area
- `dialog-header` - Dialog header
- `dialog-title` - Dialog title
- `dialog-footer` - Dialog footer
- `dialog-close` - Dialog close button

### Form Components

- `form-item` - Form item wrapper
- `form-control` - Form control wrapper
- `form-message` - Form error/validation message

### Select Components

- `select` - Select wrapper
- `select-trigger` - Select trigger button
- `select-value` - Selected value display
- `select-content` - Dropdown content
- `select-item` - Individual select option

### Other UI Components

- `label` - Label elements
- `avatar` - Avatar wrapper
- `avatar-fallback` - Avatar fallback content
- `separator` - Separator line
- `h1` - H1 headings
- `h3` - H3 headings
- `paragraph` - Paragraph elements
- `loader-spinner` - Loading spinner
- `loading-overlay` - Loading overlay container
- `loading-message` - Loading message text

## Application Components

### Navigation

- `navbar` - Main navigation bar
- `navbar-logo` - Logo/brand link
- `navbar-actions` - Navigation action buttons
- `signin-link` - Sign in navigation link
- `signup-link` - Sign up navigation link

### Authentication Forms

#### Login Form

- `login-form-container` - Login page container
- `github-signin-button` - GitHub sign in button
- `login-form` - Login form element
- `email-input` - Email input field
- `password-input` - Password input field
- `login-submit-button` - Login submit button

#### Signup Form

- `signup-form-container` - Signup page container
- `github-signup-button` - GitHub signup button
- `signup-form` - Signup form element
- `signup-email-input` - Email input (signup)
- `signup-password-input` - Password input (signup)
- `confirm-password-input` - Confirm password input
- `signup-submit-button` - Signup submit button

### Dashboard Layout

- `dashboard-layout` - Main dashboard container
- `sidebar` - Sidebar navigation
- `sidebar-header` - Sidebar header section
- `sidebar-nav` - Sidebar navigation list
- `nav-dashboard` - Dashboard navigation link
- `nav-patients` - Patients navigation link
- `nav-activities` - Activities navigation link
- `nav-notifications` - Notifications navigation link
- `sidebar-footer` - Sidebar footer
- `logout-button` - Logout button
- `main-content` - Main content area
- `header` - Dashboard header
- `user-avatar` - User avatar in header
- `page-content` - Page content container

### Pages

#### Root Pages

- `home-page` - Home page container
- `signup-page` - Signup page container

#### Dashboard Pages

- `dashboard-title` - Dashboard page title
- `activities-title` - Activities page title
- `notifications-title` - Notifications page title
- `vitals-title` - Vitals page title

#### Patients Page

- `patients-page` - Patients page container
- `patients-header` - Patients page header
- `add-patient-button` - Add patient button
- `patients-search` - Search section
- `patients-search-input` - Search input field
- `no-patients-state` - Empty state when no patients
- `patients-grid` - Patients grid container

### Patient Components

#### Patient Card

- `patient-card` - Individual patient card
- `patient-info` - Patient info section
- `patient-avatar` - Patient avatar
- `patient-name` - Patient name
- `patient-age` - Patient age
- `patient-email` - Patient email
- `view-patient-button` - View patient details button
- `patient-details` - Patient details section
- `patient-gender` - Patient gender info
- `patient-phone` - Patient phone info
- `patient-city` - Patient city info

#### Add Patient Modal

- `add-patient-modal` - Add patient modal container
- `add-patient-form` - Add patient form
- `first-name-input` - First name input
- `last-name-input` - Last name input
- `birth-date-input` - Birth date input
- `email-input` - Email input (modal)
- `phone-input` - Phone input
- `address-line-1-input` - Address line 1 input
- `address-line-2-input` - Address line 2 input
- `city-input` - City input
- `zipcode-input` - ZIP code input
- `gender-select` - Gender select dropdown
- `cancel-button` - Cancel button
- `submit-button` - Submit button

## Usage Examples

### Playwright Tests

```typescript
// Navigate and interact with elements
await page.click('[data-testid="add-patient-button"]');
await page.fill('[data-testid="first-name-input"]', "John");
await page.fill('[data-testid="last-name-input"]', "Doe");
await page.click('[data-testid="submit-button"]');

// Verify elements exist
await expect(page.locator('[data-testid="patient-card"]')).toBeVisible();
```

### Cypress Tests

```typescript
// Interact with form elements
cy.get('[data-testid="email-input"]').type("user@example.com");
cy.get('[data-testid="password-input"]').type("password123");
cy.get('[data-testid="login-submit-button"]').click();

// Verify navigation
cy.get('[data-testid="dashboard-title"]').should("be.visible");
```

## Best Practices

1. **Consistency**: All test IDs follow kebab-case naming convention
2. **Descriptive**: Names clearly indicate the element's purpose
3. **Hierarchical**: Related elements have consistent prefixes (e.g., `patient-*`, `form-*`)
4. **Stable**: Test IDs are independent of styling and unlikely to change
5. **Specific**: Each test ID uniquely identifies an element or component type

## Notes

- Test IDs are added to all interactive elements (buttons, inputs, forms)
- Container elements have test IDs for section-based testing
- All major page sections and components are covered
- Loading states and empty states have appropriate test IDs
- Navigation elements are fully covered for E2E testing scenarios
