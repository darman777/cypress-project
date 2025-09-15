const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 800,
    viewportHeight: 720,
    env: {
      SauceDemo: {
        BASE_URL: 'https://www.saucedemo.com/',
        USERNAME: 'standard_user',
        PASSWORD: 'secret_sauce'
      },
      Parabank: {
        BASE_URL: 'https://parabank.parasoft.com/parabank/index.htm',
        USERNAME: 'dariusN',
        PASSWORD: 'rudy123'
      }
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
