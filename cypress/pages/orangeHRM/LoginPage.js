class orangeLoginPage {
    submitLoginForm(username, password) {
        cy.visit("https://opensource-demo.orangehrmlive.com/")
        cy.get('input[name="username"]').type(username)
        cy.get('input[name="password"]').type(password)
        cy.get('button[type="submit"]').click()
    }
}

export const onOrangeLoginPage = new orangeLoginPage