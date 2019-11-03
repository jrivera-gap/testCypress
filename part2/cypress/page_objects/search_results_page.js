/// <reference types="Cypress" />

export function validateSearchResultPageDisplayed(){
    cy.get('.woocommerce-products-header__title').should('have.text', 'Search results: “Hoodie”')
}

export function validateListItemsCount(num_items){
    cy.get('#primary .products li').should('have.length', num_items)
}

export function navigateToProduct(product_name){
    cy.get('#primary .products li').contains(product_name).click()
}