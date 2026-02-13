/// <reference types="cypress" />

describe('Login', () => {
    it.only('should allow a user to log in with valid credentials', () => {
        cy.loginToSauce()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    })

    it('should display an error for invalid credentials', () => {
        cy.visit('https://www.saucedemo.com')

        cy.get('#user-name').click().type('standard_user')
        cy.get('#password').click().type('Welcome123')

        cy.get('#login-button').click()
        cy.get('.error-message-container')
            .find('[data-test="error"]')
            .should('have.text','Epic sadface: Username and password do not match any user in this service')
    })

    it('should display an error for missing username', () => {
        cy.visit('https://www.saucedemo.com')

        cy.get('#password').click().type('secret_sauce')

        cy.get('#login-button').click()
        cy.get('.error-message-container')
            .find('[data-test="error"]')
            .should('have.text','Epic sadface: Username is required')
    })

    it('should display an error for missing password', () => {
        cy.visit('https://www.saucedemo.com')

        cy.get('#user-name').click().type('standard_user')

        cy.get('#login-button').click()
        cy.get('.error-message-container')
            .find('[data-test="error"]')
            .should('have.text','Epic sadface: Password is required')
    })

    it('should display an error for locked out account', () => {
        cy.visit('https://www.saucedemo.com')

        cy.get('#user-name').click().type('locked_out_user')
        cy.get('#password').click().type('secret_sauce')

        cy.get('#login-button').click()
        cy.get('.error-message-container')
            .find('[data-test="error"]')
            .should('have.text','Epic sadface: Sorry, this user has been locked out.')
    })

    it('should display an error icon and remove it when when dismissed', () => {
         cy.visit('https://www.saucedemo.com')

        cy.get('#user-name').click().type('locked_out_user')
        cy.get('#password').click().type('secret_sauce')

        cy.get('#login-button').click()
        cy.get('.form_group').find('svg').should('exist')

        cy.get('.error-message-container')
            .find('.error-button')
            .click()

        cy.get('.form_group').find('svg').should('not.exist')
    })
})