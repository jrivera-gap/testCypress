/// <reference types="Cypress" />

// This function navigate to home page
export function navigateHome(){
    cy.visit('http://34.205.174.166/')
    cy.title().should('eq', "QA Playground – Just another WordPress site")
    cy.get('#masthead').find('#woocommerce-product-search-field-0').should('be.visible')
}

// This function searches a product from the home page
export function searchProduct(product_name){
    cy.get('#woocommerce-product-search-field-0').type(product_name + "{enter}")
}