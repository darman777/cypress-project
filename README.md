Cypress Automation Portfolio

This repository contains end-to-end (E2E) test automation projects built using Cypress.
The purpose is to showcase automation skills, including:

Page Object Model (POM)

Fixtures & Environment Variables

Dynamic Test Data

API Intercepts & Mocking

Cypress Best Practices

Projects:

1. OrangeHRM Demo

Website: OrangeHRM Demo

Purpose: Demonstrate automation of employee management workflows and API mocking.

Implemented Tests:

Login Tests – Positive login with environment variables.

Add Employee – Create a new employee and verify details.

Edit Employee – Update contact details.

Delete Employee – Remove an employee and validate deletion.

Mock API Response – Intercept POST /api/v2/pim/employees and return a custom 400 error response.

Notes:

Uses fixtures for employee data.

Demonstrates both UI E2E flows and API intercepts.

Perfect for showing real-world HR system automation.

2. SauceDemo

Website: SauceDemo

Purpose: Practice E2E testing on a demo e-commerce site.

Implemented Tests:

Login Tests – Positive & negative scenarios (fixtures for credentials).

Checkout Flow – Add product to cart, verify prices, fill in checkout info, and confirm order completion.

Data Handling – Used POM & fixtures for reusable test code.

Notes:

Simple demo site for practicing test automation flows.

Limited complexity compared to real e-commerce.

3. Parabank

Website: Parabank

Purpose: Demonstrate advanced automation scenarios like user registration, login, and banking operations.

Implemented Tests:

Auto-Register & Login – Generate new random users dynamically.

Fund Transfer – Transfer funds and validate balances.

Bill Pay Form – Positive and negative test data validation.

Open New Account – Create accounts and verify in Accounts Overview.

Notes / Limitations:

Login accepts any username/password, so negative login tests don’t fail realistically.

Some data resets after refresh.

Used mainly to show automation complexity handling.

Key Features

Page Object Model (POM): Clean, maintainable code structure.

Fixtures & Env Variables: Reusable test data and credentials.

Dynamic Data: Randomized inputs for better coverage.

Assertions: Validate elements, URLs, messages, and content.

API Intercepts: Mock requests/responses for error handling scenarios.

Installation

Clone the repository:

git clone https://github.com/darman777/cypress-project.git
cd cypress-project


Install dependencies:

npm install


Run Cypress (UI mode):

npx cypress open


Or headless mode:

npx cypress run

Usage

Each project (OrangeHRM / SauceDemo / Parabank) has separate test specs & fixtures.

Credentials and base URLs are configured via cypress.config.js and environment variables.

Tests demonstrate end-to-end workflows, dynamic data, and error handling.

Notes

These projects are built for learning and portfolio purposes.

Some functionality may behave unexpectedly due to the demo nature of the apps.

The goal is to showcase Cypress automation skills, test structuring, and best practices.