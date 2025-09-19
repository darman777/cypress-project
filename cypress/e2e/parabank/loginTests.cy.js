import { onBankLoginPage } from '../../pages/parabank/BankLoginPage'
import { username, password } from '../../fixtures/parabank/bankCreds'

// const paraBankCreds = Cypress.env('Parabank')
const url = Cypress.env('Parabank')


it('Positive Login Test', () => {
    onBankLoginPage.submitLoginForm(username, password)
    cy.url().should('include', '/parabank/overview.htm')
    cy.get('#showOverview').contains('Accounts Overview').should('be.visible')
})

//below test does not work due to parabank's changed credential conditions
it.only('Negative Login Test', () => {
    onBankLoginPage.submitLoginForm(username, 'wrongPassword')
    cy.get('.title').should('contain.text', 'Error!')
    cy.get('.error').should('contain.text', 'The username and password could not be verified.')
})

it('Forgot Login info and Register buttons validation', () => {
    cy.visit(url.BASE_URL)
    cy.contains('Forgot login info?').should('be.visible')
    cy.contains('Register').should('be.visible')
})