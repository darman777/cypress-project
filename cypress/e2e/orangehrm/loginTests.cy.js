const creds = Cypress.env('OrangeHRM')

it('Positive Login Test', () => {
    cy.loginOrangeHRM(creds.USERNAME, creds.PASSWORD)
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
})

it('Negative Login Test', () => {
    cy.loginOrangeHRM(creds.USERNAME, 'wrongpassword')
    cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials');
})
