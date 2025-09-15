// class LoginPage {
//   // Selectors
//   get usernameField() {
//     return cy.get('[data-test="username"]');
//   }
  
//   get passwordField() {
//     return cy.get('[data-test="password"]');
//   }
  
//   get loginButton() {
//     return cy.get('[data-test="login-button"]');
//   }
  
//   get errorMessage() {
//     return cy.get('[data-test="error"]');
//   }

//   // Actions
//   visit() {
//     cy.visit('https://www.saucedemo.com/');
//   }

//   login(username, password) {
//     this.usernameField.type(username);
//     this.passwordField.type(password);
//     this.loginButton.click();
//   }

//   // Validations
//   shouldShowError() {
//     this.errorMessage.should('be.visible');
//   }

//   shouldBeOnLoginPage() {
//     cy.url().should('include', '/');
//   }
// }

// export default LoginPage;


class LoginPage {

    submitLoginForm(username, password) {
        cy.visit('/');
        cy.get('[data-test="username"]').type(username);
        cy.get('[data-test="password"]').type(password);
        cy.get('[data-test="login-button"]').click();
    }
}

export const onLoginPage = new LoginPage();