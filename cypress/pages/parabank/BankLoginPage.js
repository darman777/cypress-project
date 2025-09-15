class BankLoginPage {

    submitLoginForm(username, password) {
        cy.visit('https://parabank.parasoft.com/parabank/index.htm');
        cy.get('[name="username"]').type(username);
        cy.get('[name="password"]').type(password);
        cy.get('input.button').click();
    }
}

export const onBankLoginPage = new BankLoginPage();