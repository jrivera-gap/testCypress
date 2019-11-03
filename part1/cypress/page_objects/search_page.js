/// <reference types="Cypress" />

export function navigateHome(){
    cy.visit('http://localhost/index.html', { timeout: 10000 })
    cy.title().should('eq', 'Library Page')
}

export function search(name){
    cy.get('#search_bar').clear()
    cy.get('#search_bar').type(name + "{enter}")
}

export function validateBookTitle(title){
    cy.get('.title').should('have.text', title)
}

export function validateBookAuthor(author){
    cy.get('.author').should('have.text', author)
}