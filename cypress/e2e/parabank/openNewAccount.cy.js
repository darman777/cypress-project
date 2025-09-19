import { onBankLoginPage } from '../../pages/parabank/BankLoginPage'
import { username, password } from '../../fixtures/parabank/bankCreds'

beforeEach('Login to test application', () => {
    onBankLoginPage.submitLoginForm(username, password)
})

it('Open New Account Form Test', () => {
    cy.get('#leftPanel').contains('Open New Account').click()
    cy.get('#type').select('1').should('contain.text', 'SAVINGS')
    cy.get('#fromAccountId').find('option').eq(0).invoke('val').then(accountID => {
        cy.get('#fromAccountId').select(accountID).should('have.value', accountID)
    })
    cy.get('input[value="Open New Account"]').click()
    cy.get('.title').should('contain.text', 'Account Opened!')
    cy.get('#openAccountResult').should('contain.text', 'Congratulations, your account is now open.')
    //Verify new account is created
    cy.get('#newAccountId').should('be.visible').invoke('text').then((newAccountId) => {
        expect(newAccountId.trim()).to.not.be.empty
        cy.get('#leftPanel').contains('Accounts Overview').click()
        cy.contains('td', newAccountId).should('be.visible')
    })

    

})

