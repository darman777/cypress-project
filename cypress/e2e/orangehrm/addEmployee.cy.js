import 'cypress-file-upload'
import { onOrangeLoginPage } from '../../pages/orangeHRM/LoginPage'
import { employeeData } from '../../fixtures/orangeHRM/employeeData.cy'
const creds = Cypress.env('OrangeHRM')
const { firstName, middleName, lastName, employeeID, photo } = employeeData
const picturePath = '/orangeHRM/employee.jpg'

beforeEach('Login to test application', () => {
    onOrangeLoginPage.submitLoginForm(creds.USERNAME, creds.PASSWORD)
})

it.only('Add new Employee with random ID and photo upload', () => {
    cy.intercept('POST', '**/api/**/pim/employees').as('addEmployee')
    cy.url().should('include', '/dashboard')
    cy.contains('.oxd-main-menu-item', 'PIM').click()

    cy.contains('button', 'Add').click()
    cy.get('input[placeholder="First Name"]').click().type(firstName)
    cy.get('input[placeholder="Middle Name"]').click().type(middleName)
    cy.get('input[placeholder="Last Name"]').click().type(lastName)
    cy.contains('label', 'Employee Id')
        .parent()
        .parent()
        .find('input')
        .click()
        .clear()
        .type(employeeID)
    cy.get('input[type="file"]').attachFile(picturePath)
    cy.contains('button', 'Save').click()

    cy.wait('@addEmployee').its('response.statusCode').should('eq', 200)

    cy.url().should('include', '/viewPersonalDetails')
    cy.get('.orangehrm-edit-employee-name').should('contain.text', 'Thomas Wellington')

    cy.writeFile('cypress/fixtures/orangeHRM/employee.json', { employeeID })
})


it('Verify newly created employee ID exists', () => {

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