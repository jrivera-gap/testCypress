/// <reference types="Cypress" />

// This function navigates to the poducts page
export function navigateProduct(product_id){
    cy.visit(`http://34.205.174.166/product/${product_id}/`)
}

// This function validates the product page is correctly displayed 
export function validateProductPageDisplayed(product_name){
    cy.get('.woocommerce-breadcrumb').should('contain.text', product_name)
    cy.get('.product_title').should('have.text', product_name)
    cy.get('.summary > .price').should('be.visible')
}

// This function increments the quantity of items
export function increaseQuantity(num){
    cy.get('.quantity input').clear()
    cy.get('.quantity input').type(num)
    cy.get('.quantity input').then(($value) => {
        let inputValue = Number($value.val())
        expect(inputValue).to.equals(num)
    })
}

// This function clicks tha add to cart button and verifies the correct amount of items have been added to the cart
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

// ===========   API ============ //

// Creates a new product by API
// parameters:
// name: name of the product
// price: price of the product i.e "35.00"
// desc: description of the product

export function createProductApi(name, price, desc){
    cy.request({
        method: 'POST',
        url: 'http://34.205.174.166/wp-json/wc/v3/products', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        auth: {
          username: 'shopmanager',
          password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
        },
        qs: {
            name: name,
            type: 'simple',
            regular_price: price,
            description: desc 
        }
      })
}

// Deletes a product by API
// parameters:
// name: name of the product
export function deleteProductApi(name){
    cy.request({
        method: 'GET',
        url: 'http://34.205.174.166/wp-json/wc/v3/products/', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        auth: {
          username: 'shopmanager',
          password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
        },
        qs: {
            search: name
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