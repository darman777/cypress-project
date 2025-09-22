import { onOrangeLoginPage } from '../../pages/orangeHRM/LoginPage'
const creds = Cypress.env('OrangeHRM')

it('Delete Employee', () => {
    onOrangeLoginPage.submitLoginForm(creds.USERNAME, creds.PASSWORD)
    cy.readFile('cypress/fixtures/orangeHRM/employee.json').then((data) => {
        cy.contains('.oxd-main-menu-item', 'PIM').click()
        cy.get('div.oxd-table-filter-header').find('button[type="button"]').click()
        cy.contains('label', 'Employee Id')
            .parents('.oxd-input-group')
            .find('input')
            .type(data.employeeID)

        cy.contains('button', 'Search').click()

        cy.get('button .bi-trash').first().click()
        cy.contains(' Yes, Delete ').click()
        cy.contains('No Records Found').should('be.visible')
        
        
    })
})


