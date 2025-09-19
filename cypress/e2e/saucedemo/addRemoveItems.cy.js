/// <reference types="cypress" />

import { onSauceLoginPage } from '../../pages/saucedemo/LoginPage.js'
const {USERNAME, PASSWORD} = Cypress.env('SauceDemo')

describe('Add and Remove Items Tests', () => {
    beforeEach('Login to test application', () => {
        onSauceLoginPage.submitLoginForm(USERNAME, PASSWORD);
    })

    it('Add all items to the cart', () => {
        cy.get('.inventory_item').each(($item) => {
            cy.wrap($item).find('[data-test*="add-to-cart"]').click()
        })
        cy.get('.shopping_cart_badge').should('be.visible').should('contain', '6')
    })

    it('Remove 2 items from the cart', () => {
        cy.get('.inventory_item').each(($item, index) => {
            if (index < 3) {
                cy.wrap($item).find('[data-test*="add-to-cart"]').click()
            }
        })

        // Verify 3 items in cart
        cy.get('.shopping_cart_badge').should('be.visible').should('contain', '3')

        // Go to cart page
        cy.get('.shopping_cart_badge').click()
        cy.get('.cart_item').should('have.length', 3)

        // Remove 2 items from the cart
        cy.contains('.cart_item', 'Sauce Labs Backpack').find('.btn_secondary').click()
        cy.contains('.cart_item', 'Sauce Labs Bolt T-Shirt').find('.btn_secondary').click()
        // // Verify 1 item remains
        cy.get('.shopping_cart_badge').should('be.visible').should('contain', '1')
    })

    it('Sort Products by Price (Low to High)', () => {
        cy.get('[data-test="product-sort-container"]').should('be.visible')
        cy.get('[data-test="product-sort-container"]').select(1)
    })
})