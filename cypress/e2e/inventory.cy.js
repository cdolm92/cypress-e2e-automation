/// <reference types="cypress" />

describe('Inventory', () => {
    it('should sort products by price', () => {
        cy.loginToSauce()

        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        cy.get('[data-test="inventory-item-price"]').then(($prices) => {
            const productPrices = [...$prices].map(el =>
                Number(el.innerText.replace('$', ''))
             )

            const sortedPrices = [...productPrices].sort((a, b) => a - b)

            expect(productPrices).to.deep.equal(sortedPrices)
        })
    })

    it('should sort products by name', () => {
        cy.loginToSauce()

        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

        cy.get('[data-test="product-sort-container"]').select('Name (A to Z)')
        
        cy.get('[data-test="inventory-item-name"]').then(($name) => {
            const productNames = [...$name].map(el =>
                el.innerText
             )
             
            const sortedNames = [...productNames].sort((a, b) => a - b)

            expect(productNames).to.deep.equal(sortedNames)
        })
    })

    it('should display the same product name and price on inventory and product detail pages', () => {
        cy.loginToSauce()
       
        cy.get('[data-test="inventory-list"] [data-test="inventory-item-name"]').each(($item, index) => {
            cy.get('[data-test="inventory-item-name"]').eq(index).click()
            cy.get('[data-test="inventory-item-name"]').should('have.text', $item.text())
            cy.go('back')
        })

         cy.get('[data-test="inventory-list"] [data-test="inventory-item-price"]').each(($item, index) => {
            cy.get('[data-test="inventory-item-name"]').eq(index).click()
            cy.get('[data-test="inventory-item-price"]').should('have.text', $item.text())
            cy.go('back')
        })
    })
})