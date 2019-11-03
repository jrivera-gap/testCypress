/// <reference types="Cypress" />

export function goToHome(){
    cy.get('.cart-contents').click()    
}

export function goToCartIcon(){
    cy.get('.cart-contents').click({force: true}) 
}
