/// <reference types="Cypress" />

// This function validates the search page is displayed correctly
export function validateSearchResultPageDisplayed(){
    cy.get('.woocommerce-products-header__title').should('have.text', 'Search results: “Hoodie”')
}

// This function validates the search page displays the correct amount of items
export function validateListItemsCount(num_items){
    cy.get('#primary .products li').should('have.length', num_items)
}

// This function clicks on the listed product
export function navigateToProduct(product_name){
    cy.get('#primary .products li').contains(product_name).click()
}