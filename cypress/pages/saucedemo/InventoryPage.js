class InventoryPage {
    getProduct(productName) {
      return cy.contains('.inventory_item', productName);
    }
    getAddToCartButton(productName) {
      return this.getProduct(productName).find('[data-test*="add-to-cart"]');
    }
    getCartBadge() {
      return cy.get('.shopping_cart_badge');
    }
  }
  export default new InventoryPage();