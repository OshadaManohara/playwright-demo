## Prompts
1. Generate test for 'Search Patient'

Navigate to `http://localhost:3000` Playwright MCP Server with current Playwright configurations. Then login to the system using the following credentials.
After logging in, navigate to `/patients` route and test the 'Search Patient' functionality only for following 3 usecases. Here Patients will be rendered in a list of Cards.
1. All Patients are rendered by default.
2. Search Patient by Name.
3. Search Patient by Email.

Credentials:
email: sahan.amarsha+test2@rootcode.io
pwd: Test@123


2. Refactor code to use ‘Session Storage’

Can you update `search-patient.spec.ts` so that login happens once in setup and session storage is saved in a JSON file in `e2e/.auth`?


3. Update the generated code to use 'POM'

Can you update the current generated code for 'Search Patient' (search-patient.spec.ts), and 'List Patient' (patient-listing.spec.ts) so that we are using Page Object Model pattern.


4. Test using 'Manual Testing Prompt'

Follow instructions in `manual_testing_prompt.md`.


## Branches
Feature/sahan
Feature/sahan_session_storage
Feature/sahan_pom
Feature/sahan_no_code