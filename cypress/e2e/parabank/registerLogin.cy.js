// cypress/e2e/parabank/registerLogin.spec.js
const url = Cypress.env('Parabank')
import { password, username } from '../../fixtures/bankCreds'

function generateRandomString(length = 6) {
    return Math.random().toString(36).substring(2, 2 + length);
}




it('Register and Login', () => {

    // Register new user
    cy.visit(url.BASE_URL);
    cy.contains('Register').click();

    cy.get('input[name="customer.firstName"]').type('John');
    cy.get('input[name="customer.lastName"]').type('Doe');
    cy.get('input[name="customer.address.street"]').type('123 Main St');
    cy.get('input[name="customer.address.city"]').type('Anytown');
    cy.get('input[name="customer.address.state"]').type('CA');
    cy.get('input[name="customer.address.zipCode"]').type('12345');
    cy.get('input[name="customer.phoneNumber"]').type('123-456-7890');
    cy.get('input[name="customer.ssn"]').type('123-45-6789');

    cy.get('input[name="customer.username"]').type(username);
    cy.get('input[name="customer.password"]').type(password);
    cy.get('input[name="repeatedPassword"]').type(password);

    cy.get('input[value="Register"]').click();

    // Verify registration success
    cy.contains('Your account was created successfully. You are now logged in.').should('be.visible');
});



