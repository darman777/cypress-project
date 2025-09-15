import { onBankLoginPage } from '../../pages/parabank/BankLoginPage'
import { password, username } from '../../fixtures/bankCreds'
// const paraBankCreds = Cypress.env('Parabank')
let randomNumber = Math.floor(Math.random() * 1000)

beforeEach('Login to test application', () => {
    onBankLoginPage.submitLoginForm(username, password)
})

it('Fund Transfer Form Test', () => {
    cy.get('#leftPanel').contains('Transfer Funds').click()
    
    // Test form elements are present and functional
    cy.get('#amount').should('be.visible').type(randomNumber)
    
    // Select by index
    cy.get('#fromAccountId').select(0)
    cy.get('#toAccountId').select(0)
    
    // Verify form is populated correctly (check that values are not empty)
    cy.get('#amount').should('have.value', randomNumber)
    cy.get('#fromAccountId').should('not.have.value', '')
    cy.get('#toAccountId').should('not.have.value', '') 
    cy.get('input[value="Transfer"]').should('be.visible').click()
    cy.get('#rightPanel').contains('Transfer Complete!').should('be.visible')
    cy.get('#amountResult').should('be.visible').contains('$' + randomNumber + '.00')
    cy.get('#fromAccountIdResult').should('be.visible')
    cy.get('#toAccountIdResult').should('be.visible')
})  