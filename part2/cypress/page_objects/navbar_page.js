/// <reference types="Cypress" />

// This function navigate to home from navbar
export function goToHome(){
    cy.get('.cart-contents').click()    
}

// This function navigates to Cart from navbar
export function goToCartIcon(){
    cy.get('.cart-contents').click({force: true}) 
}
