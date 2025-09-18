Cypress Automation Portfolio

This repository contains end-to-end (E2E) test automation projects built using Cypress. The purpose of these projects is to demonstrate skills in automated testing, page object modeling (POM), fixtures, dynamic data handling, and Cypress best practices.

Projects
1. SauceDemo

Website: https://www.SauceDemo.com

Purpose: Practice E2E testing on a demo e-commerce site.

Implemented Tests:

Login Tests – Positive and negative scenarios using credentials stored in fixtures.

Checkout Flow – Add product to cart, verify prices, fill in checkout info, and confirm order completion.

Data Handling – Used POM and fixtures for cleaner, reusable test code.

Notes:
SauceDemo is a simple demo site, ideal for practicing test automation flows, but it has limited complexity.

2. Parabank

Website: https://parabank.parasoft.com/parabank/index.htm

Purpose: Demonstrate advanced automation scenarios including user registration, login, and banking operations.

Implemented Tests:

Auto-Register & Login – Dynamically create random users for each test run.

Fund Transfer – Transfer funds between accounts and verify balances.

Bill Pay Form – Fill out bill payment forms with valid and invalid data.

Open New Account – Create new accounts, verify account IDs in Accounts Overview.

Notes / Limitations:

Parabank is a demo/testing web app, and its behavior is not fully realistic.

The login feature accepts any username/password, so negative login tests cannot reliably fail.

Some data (accounts, balances) may reset after login or page refresh.

Tests focus on demonstrating automation skills rather than verifying real-world banking functionality.

Key Features

Page Object Model (POM): Organized test code for maintainability.

Fixtures & Environment Variables: Used for reusable test data and credentials.

Dynamic Data: Auto-generated usernames, account numbers, and other inputs.

Assertions: Verified page elements, URLs, messages, and dynamic content.

Installation

Clone the repository:

git clone <https://github.com/darman777/cypress-project.git>
cd <cypress-project>


Install dependencies:

npm install


Run Cypress:

npx cypress open


or headless mode:

npx cypress run

Usage

Each project (SauceDemo / Parabank) has separate tests and fixtures.

Configure credentials and base URLs in cypress.config.js or environment variables.

Tests demonstrate end-to-end flows, dynamic data usage, and error handling.

Notes

These projects are for learning and portfolio purposes.

Some functionality may behave unexpectedly due to the demo nature of the websites.

The goal is to showcase Cypress automation skills, test structuring, and best practices.