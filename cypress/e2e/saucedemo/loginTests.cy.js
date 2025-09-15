it('Positive Login Test', () => {
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
    cy.url().should('include', '/inventory.html');
    cy.contains('Products').should('be.visible');
})

it('Negative Login Test', () => {
    cy.login(Cypress.env('USERNAME'), 'invalid_password');
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
})