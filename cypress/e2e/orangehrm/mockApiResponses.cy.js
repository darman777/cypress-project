import { onOrangeLoginPage } from '../../pages/orangeHRM/LoginPage'
import { employeeData } from '../../fixtures/orangeHRM/employeeData.cy'
const creds = Cypress.env('OrangeHRM')
const { firstName, middleName, lastName, employeeID, photo } = employeeData

beforeEach('Login to test application', () => {
    onOrangeLoginPage.submitLoginForm(creds.USERNAME, creds.PASSWORD)
})

it.only('Add Employee - Mock 400 Error', () => {

    cy.intercept('POST', '**/api/v2/pim/employees', {
        statusCode: 400
    }).as('addEmployee')


    cy.contains('.oxd-main-menu-item', 'PIM').click()
    cy.contains('button', 'Add').click()

    cy.get('input[placeholder="First Name"]').click().type(employeeData.firstName)
    cy.get('input[placeholder="Last Name"]').click().type(employeeData.lastName)
    cy.contains('label', 'Employee Id')
        .parent()
        .parent()
        .find('input')
        .click()
        .clear()
        .type(employeeID)

    cy.contains('button', 'Save').click()

    cy.wait('@addEmployee').its('response.statusCode').should('eq', 400)


})


it('should handle slow API response gracefully', () => {

    cy.intercept('POST', '**/api/v2/pim/employees', {
        statusCode: 201,
        delay: 10000,
        body: {
            id: 1234,
            firstName: 'Wilson',
            lastName: 'Jackson'
        }
    }).as('addEmployeeSlow')


    cy.contains('.oxd-main-menu-item', 'PIM').click()
    cy.contains('button', 'Add').click()

    cy.get('input[placeholder="First Name"]').type(employeeData.firstName)
    cy.get('input[placeholder="Last Name"]').type(employeeData.lastName)

    cy.contains('button', 'Save').click()


    cy.wait('@addEmployeeSlow').then(({ response }) => {
        expect(response.statusCode).to.eq(201)
        expect(response.body).to.have.property('firstName', 'Wilson')
        console.log('Mocked Response:', response)
    })


    cy.get('.oxd-loading-spinner').should('be.visible')


    cy.contains('.oxd-toast', 'Successfully Saved').should('be.visible')
})
