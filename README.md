# Cypress E2E Automation Suite — SauceDemo

This project demonstrates end-to-end test automation using Cypress on the SauceDemo web application.  
Coverage includes login, cart/checkout flows, negative validation scenarios, and UI state assertions.

## Tech Stack
- Cypress
- JavaScript
- Node.js

## Test Coverage
- Login: valid/invalid credentials, missing fields, locked-out user, error UI behavior
- Inventory: verify inventory sorting dynamically (price/name)
- Checkout: add/remove items across pages, form validation, successful checkout confirmation

## How to Run
1. Install dependencies:
   ```bash
   npm install

2. Open Cypress:
   ```bash
   npx cypress open

## Notes
- Tests use stable selectors where available (e.g., data-test attributes).
- Assertions are written to validate user behavior and expected outcomes (not implementation details).
