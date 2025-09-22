import { onOrangeLoginPage } from '../../pages/orangeHRM/LoginPage'
import { employeeData } from '../../fixtures/orangeHRM/employeeData.cy'
const creds = Cypress.env('OrangeHRM')
const { firstName, middleName, lastName, employeeID, photo } = employeeData


it('Verify newly created employee ID exists', () => {
    onOrangeLoginPage.submitLoginForm(creds.USERNAME, creds.PASSWORD)

    cy.readFile('cypress/fixtures/orangeHRM/employee.json').then((data) => {
        cy.contains('.oxd-main-menu-item', 'PIM').click()
        cy.get('div.oxd-table-filter-header').find('button[type="button"]').click()
        cy.contains('label', 'Employee Id')
            .parents('.oxd-input-group')
            .find('input')
            .type(data.employeeID)

        cy.contains('button', 'Search').click()


        cy.get('.oxd-table-card').first().within(() => {
            cy.contains(data.employeeID)            
            cy.contains(employeeData.firstName)             
            cy.contains(employeeData.lastName)
            cy.contains(employeeData.middleName)              
        })
        
    })
})