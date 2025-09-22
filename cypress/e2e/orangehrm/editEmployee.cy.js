import { onOrangeLoginPage } from '../../pages/orangeHRM/LoginPage'
import { employeeData } from '../../fixtures/orangeHRM/employeeData.cy'
const creds = Cypress.env('OrangeHRM')
const { firstName, middleName, lastName, employeeID, photo } = employeeData

it('Edit Employee Details', () => {
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
            cy.contains(data.employeeID).click()
        })


        cy.get('.orangehrm-tabs-wrapper').contains('Contact Details').click()

        cy.contains('label', 'Street 1').parents('.oxd-input-group').find('input').clear().type('My First Street')
        cy.contains('label', 'Street 2').parents('.oxd-input-group').find('input').clear().type('My Second Street')
        cy.contains('label', 'City').parents('.oxd-input-group').find('input').clear().type('Vilnius')
        cy.contains('label', 'Zip/Postal Code').parents('.oxd-input-group').find('input').clear().type('9999')
        cy.contains('label', 'Mobile').parents('.oxd-input-group').find('input').clear().type('0123456789')
        cy.contains('label', 'Work Email').parents('.oxd-input-group').find('input').clear().type('admin@example.com')
        cy.get('div.oxd-select-text-input').click()
        cy.get('.oxd-select-dropdown').contains('Lithuania').click()
        cy.contains('button', 'Save').click()

        cy.get('.oxd-toast--success')
            .should('be.visible')
            .contains('Successfully Updated')



    })

})