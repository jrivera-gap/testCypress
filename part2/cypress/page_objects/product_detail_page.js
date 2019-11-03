/// <reference types="Cypress" />

export function navigateProduct(product_id){
    cy.visit(`http://34.205.174.166/product/${product_id}/`)
}

export function validateProductPageDisplayed(product_name){
    cy.get('.woocommerce-breadcrumb').should('contain.text', product_name)
    cy.get('.product_title').should('have.text', product_name)
    cy.get('.summary > .price > .woocommerce-Price-amount').should('be.visible')
}

export function increaseQuantity(num){
    cy.get('.quantity input').clear()
    cy.get('.quantity input').type(num)
    cy.get('.quantity input').then(($value) => {
        let inputValue = Number($value.val())
        expect(inputValue).to.equals(num)
    })
}

export function addToCart(){
    cy.get('#site-header-cart .count').then(($count) => {
        let itemsCount = Number($count.text().split(" ")[0])
        
        cy.get('.single_add_to_cart_button').click()

        cy.get('.quantity input').then(($value) => {
            let inputValue = Number($value.val())
            let total = itemsCount + inputValue
            cy.get('#site-header-cart .count').should('have.text', total.toString() + " items")
        })
    })
}

export function validateItemsCart(count_items){
    cy.get('.cart-contents > .count').should('have.text', count_items.toString() + " items")
}

export function applyCoupon(){
    cy.get('.coupon > .button').click()
}

export function createProductApi(){
    cy.request({
        method: 'POST',
        url: 'http://34.205.174.166/wp-json/wc/v3/products', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        auth: {
          username: 'shopmanager',
          password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
        },
        qs: {
            name: 'Jack',
            type: 'simple',
            regular_price: '35',
            description: 'this%20is%20the%20bes%20tshirt%20ever' 
        }
      })
}

export function deleteProductApi(){
    cy.request({
        method: 'GET',
        url: 'http://34.205.174.166/wp-json/wc/v3/products/', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        auth: {
          username: 'shopmanager',
          password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
        },
        qs: {
            search: 'Jack'
        }
      }).then(($lista) =>{
        let id_producto = $lista.body[0].id
        cy.request({
            method: 'DELETE',
            url: 'http://34.205.174.166/wp-json/wc/v3/products/' + id_producto, // baseUrl is prepended to url
            form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            auth: {
              username: 'shopmanager',
              password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
            }
          })
      })
}