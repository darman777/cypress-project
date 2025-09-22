import { onOrangeLoginPage } from '../../pages/orangeHRM/LoginPage'
import { employeeData } from '../../fixtures/orangeHRM/employeeData.cy'
const creds = Cypress.env('OrangeHRM')

beforeEach('Login to test application', () => {
    onOrangeLoginPage.submitLoginForm(creds.USERNAME, creds.PASSWORD)
})

it('Add Employee - Mock 400 Error', () => {

    cy.intercept('POST', '**/api/v2/pim/employees', {
        statusCode: 400,
        body: { message: 'Invalid employee data' }
    }).as('addEmployee')


    cy.contains('.oxd-main-menu-item', 'PIM').click()
    cy.contains('button', 'Add').click()

    cy.get('input[placeholder="First Name"]').click().type(employeeData.firstName)
    cy.get('input[placeholder="Last Name"]').click().type(employeeData.lastName)

    cy.contains('button', 'Save').click()

    cy.wait('@addEmployee').then(({response}) => {
        expect(response.statusCode).to.eq(400)
  expect(response.body).to.have.property('message', 'Invalid employee data')
    })


})


it.only('should handle slow API response gracefully', () => {
    
    cy.intercept('POST', '**/api/v2/pim/employees', {
      statusCode: 201,
      delay: 10000, // 3 second delay
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
