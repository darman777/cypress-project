/// <reference types="cypress" />

import InventoryPage from '../../pages/saucedemo/InventoryPage';
import { checkoutData } from '../../fixtures/saucedemo/checkoutData';
import { onSauceLoginPage } from '../../pages/saucedemo/LoginPage.js';
const {USERNAME, PASSWORD} = Cypress.env('SauceDemo')

beforeEach('Login to test application', () => {
    onSauceLoginPage.submitLoginForm(USERNAME, PASSWORD);
})


it('E2E Checkout Flow', () => {

    const { productName, expectedPrice, expectedTax, expectedTotal, customerInfo } = checkoutData;

    // Add product to cart and verify
    InventoryPage.getProduct(productName)
        .find('[data-test="inventory-item-price"]')
        .should('have.text', expectedPrice)
        .invoke('text')
        .as('productPrice')

    InventoryPage.getAddToCartButton(productName).click()


    // // Verify cart
    InventoryPage.getCartBadge().should('be.visible').and('contain', '1').click();
    cy.get('@productPrice').then((priceFromInventory) => {
        cy.get('.inventory_item_price').should('contain', priceFromInventory);
    });


    // Fill checkout information
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type(customerInfo.firstName)
    cy.get('[data-test="lastName"]').type(customerInfo.lastName)
    cy.get('[data-test="postalCode"]').type(customerInfo.postalCode)
    cy.get('[data-test="continue"]').click()

    // Verify order summary
    cy.contains('.summary_value_label', 'SauceCard #31337').should('be.visible')
    cy.contains('.summary_value_label', 'Free Pony Express Delivery!').should('be.visible')
    cy.contains('.summary_subtotal_label', `Item total: ${expectedPrice}`).should('be.visible')
    cy.contains('.summary_tax_label', `Tax: ${expectedTax}`).should('be.visible')
    cy.contains('.summary_total_label', `Total: ${expectedTotal}`).should('be.visible')

    // Complete order
    cy.get('[data-test="finish"]').click()

    // Verify order completion
    cy.contains('.complete-header', 'Thank you for your order!').should('be.visible')
    cy.contains('.complete-text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!').should('be.visible')

    // Return to products and verify cart is empty
    cy.get('[data-test="back-to-products"]').click()
    cy.get('.inventory_item').should('have.length', 6)
    cy.get('.shopping_cart_link').should('be.visible').and('be.empty')
})


it('Negative Checkout Flow', () => {

    cy.contains('.inventory_item', 'Sauce Labs Backpack')
        .find('[data-test*="add-to-cart"]')
        .click()

    cy.get('.shopping_cart_link').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain', 'Error: First Name is required')
})