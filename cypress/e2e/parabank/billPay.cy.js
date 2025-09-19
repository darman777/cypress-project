import { onBankLoginPage } from '../../pages/parabank/BankLoginPage'
import { billPayData } from '../../fixtures/billPayData'
import { username, password } from '../../fixtures/parabank/bankCreds'
// const paraBankCreds = Cypress.env('Parabank')
const { payeeName, payeeAddress, payeeCity, payeeState, payeeZipCode, payeePhoneNumber, payeeAccountNumber, verifyAccount, amount } = billPayData


beforeEach('Login to test application', () => {
    onBankLoginPage.submitLoginForm(username, password)
})


it('Bill Pay Form Test', () => {
    //form submission
    cy.url().should('include', '/parabank/overview.htm')
    cy.get('#leftPanel').contains('Bill Pay').click()
    cy.url().should('include', '/parabank/billpay.htm')
    cy.get('input[name="payee.name"]').type(payeeName)
    cy.get('input[name="payee.address.street"]').type(payeeAddress)
    cy.get('input[name="payee.address.city"]').type(payeeCity)
    cy.get('input[name="payee.address.state"]').type(payeeState)
    cy.get('input[name="payee.address.zipCode"]').type(payeeZipCode)
    cy.get('input[name="payee.phoneNumber"]').type(payeePhoneNumber)
    cy.get('input[name="payee.accountNumber"]').type(payeeAccountNumber)
    cy.get('input[name="verifyAccount"]').type(verifyAccount)
    cy.get('input[name="amount"]').type(amount)
    cy.get('select[name="fromAccountId"]').select(0)
    cy.get('input[value="Send Payment"]').click()

    //verify bill payment complete
    cy.get('#billpayResult').contains('Bill Payment Complete').should('be.visible')
    cy.get('#amount').should('have.value', amount)
    cy.get('#fromAccountID').should('not.have.value', '')
})


it.only('Bill Pay Form Test with invalid data', () => {
    //form submission
    cy.get('#leftPanel').contains('Bill Pay').click()
    cy.get('input[name="payee.name"]').type(payeeName)
    cy.get('input[name="payee.address.street"]').type(payeeAddress)
    cy.get('input[name="payee.address.city"]').type(payeeCity)
    cy.get('input[name="payee.address.state"]').type(payeeState)
    cy.get('input[name="payee.address.zipCode"]').type(payeeZipCode)
    cy.get('input[name="payee.phoneNumber"]').type(' ')
    cy.get('input[name="payee.accountNumber"]').type(' ')
    cy.get('input[name="verifyAccount"]').type(' ')
    cy.get('input[name="amount"]').type(' ')
    cy.get('select[name="fromAccountId"]').select(0)
    cy.get('input[value="Send Payment"]').click()

    //verify validation messages
    cy.get('#validationModel-phoneNumber').contains('Phone number is required.').should('be.visible')
    cy.get('#validationModel-account-empty').contains('Account number is required.').should('be.visible')
    cy.get('#validationModel-verifyAccount-empty').contains('Account number is required.').should('be.visible')
    cy.get('#validationModel-amount-empty').contains('The amount cannot be empty.').should('be.visible')
})