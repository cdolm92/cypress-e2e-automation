declare namespace Cypress {
    interface Chainable {
        /**
         * Command to login successfully to https://www.saucedemo.com/.
         */
        loginToSauce(): Chainable<void>
    }
}