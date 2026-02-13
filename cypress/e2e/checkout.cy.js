/// <reference types="cypress" />

describe('Checkout', () => {
    it('should add product to cart from inventory page', () => {
        cy.loginToSauce()
        
        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        
        cy.get('#remove-sauce-labs-bike-light').should('have.text', 'Remove')
        cy.get('.shopping_cart_badge').should('exist')
    })

    it('should add product to cart from product page', () => {
        cy.loginToSauce()

        cy.get('[data-test="item-4-title-link"]').click()
        cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=4')
        cy.get('[data-test="add-to-cart"]').click()

        cy.get('[data-test="remove"]').should('have.text', 'Remove')
        cy.get('.shopping_cart_badge').should('exist')
    })

    it('should remove a product from the cart on the inventory page', () => {
        cy.loginToSauce()

        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('#remove-sauce-labs-bike-light').click()

        cy.get('.shopping_cart_badge').should('not.exist')
        cy.get('#add-to-cart-sauce-labs-bike-light').should('have.text', 'Add to cart')
    })

    it('should remove a product from the cart on the product page', () => {
        cy.loginToSauce()

        cy.get('[data-test="item-4-title-link"]').click()
        
        cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=4')
       
        cy.get('[data-test="add-to-cart"]').click()
        cy.get('[data-test="remove"]').click()

        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
        cy.get('[data-test="add-to-cart"]').should('have.text', 'Add to cart')
    })

    it('should remove a product from the cart on the shopping cart page', () => {
        cy.loginToSauce()
        
        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('[data-test="shopping-cart-link"]').click()  
        
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
        
        cy.get('[data-test="inventory-item"]').should('exist')
        
        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        
        cy.get('[data-test="inventory-item"]').should('not.exist')
    })

    it('should display an error when required checkout fields are missing', () => {
        cy.loginToSauce()

        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')

        cy.get('[data-test="checkout"]').click()
        
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')

        cy.get('[data-test="continue"]').click()
        
        cy.get('.error-message-container').should('exist')
        cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required')
    })

    it('should calculate item total in checkout overview ', () => {
        cy.loginToSauce()

        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('[data-test="shopping-cart-link"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')

        cy.get('[data-test="checkout"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')

        cy.get('[data-test="firstName"]').click().type('Chris')
        cy.get('[data-test="lastName"]').click().type('Dol')
        cy.get('[data-test="postalCode"]').click().type('12345')
        cy.get('[data-test="continue"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html')

        cy.get('[data-test="subtotal-label"]').then(($itemTotal) => {
            cy.get('[data-test="tax-label"]').then(($tax) => {
                cy.get('[data-test="total-label"]').then(($total) => {
                    const total = Number($total.text().replace('Total: $', ''))
                    const itemTotal = Number($itemTotal.text().replace('Item total: $', ''))
                    const tax = Number($tax.text().replace('Tax: $', ''))
                    
                    expect(total).to.eq(Number((itemTotal + tax).toFixed(2)))
                }) 
            }) 
        })
    })

     it('should complete checkout and display a confirmation message', () => {
        cy.loginToSauce()

        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        cy.get('[data-test="shopping-cart-link"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')

        cy.get('[data-test="checkout"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')

        cy.get('[data-test="firstName"]').click().type('Chris')
        cy.get('[data-test="lastName"]').click().type('Dol')
        cy.get('[data-test="postalCode"]').click().type('12345')
        cy.get('[data-test="continue"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html')
       
        cy.get('[data-test="finish"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html')
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')
    })

    it('should update the cart badge when an item is added or removed', () => {
        cy.loginToSauce()

        cy.get('#add-to-cart-sauce-labs-bike-light').click()
        
        cy.get('.shopping_cart_badge').should('exist')
        cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then(parseInt)
            .should('eq', 1)

        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then(parseInt)
            .should('eq', 2)

        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then(parseInt)
            .should('eq', 3)

        cy.get('[data-test="remove-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then(parseInt)
            .should('eq', 2)
    })
})