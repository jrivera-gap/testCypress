/// <reference types="Cypress" />

// This function validates that the amount of items is the expected
export function validateQuantityCart(count){
    cy.get('.quantity input').then(($value) => {
        let inputValue = Number($value.val())
        expect(inputValue).to.equal(count)
    })
}

// This function validates the product is listed in the cart
export function validateProductListed(product_name){
    cy.get('.product-name > a').should('have.text', product_name)
}

// This function validates the price of the product in the cart
export function validatePrice(price){
    cy.get('.product-price > .woocommerce-Price-amount').should('have.text', price)
}

//This function fills the Code field with a valid coupon
export function fillCouponCode(code){
    cy.get('#coupon_code').type(code)
}

// This function clicks on the apply button
export function applyCoupon(){
    cy.get('.coupon > .button').click()
}

// This function validates the message telling the user the coupon has been applied
export function validateDiscount(){
    cy.get('.woocommerce-message').should('include.text', "Coupon code applied successfully.")
}


// ===========   API ============ //

// Creates a new coupon by API
// parameters:
// code_name: name of the code

export function createCouponApi(code_name, percentage, amount){
    cy.request({
        method: 'POST',
        url: 'http://34.205.174.166/wp-json/wc/v3/coupons', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        auth: {
          username: 'shopmanager',
          password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
        },
        qs: {
            code: code_name,
            discount_type: 'percent',
            amount: percentage,
            individual_use: 'true',
            exclude_sale_items: 'true',
            minimum_amount: amount 
        }
      })
}

// Creates a new coupon by API
// parameters:
// code_name: name of the code to be deleted
export function deleteCouponApi(code_name){
    cy.request({
        method: 'GET',
        url: 'http://34.205.174.166/wp-json/wc/v3/coupons/', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        auth: {
          username: 'shopmanager',
          password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
        },
        qs: {
            search: code_name
        }
      }).then(($lista) =>{
        let id_coupon = $lista.body[0].id
        cy.request({
            method: 'DELETE',
            url: 'http://34.205.174.166/wp-json/wc/v3/coupons/' + id_coupon, // baseUrl is prepended to url
            form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            auth: {
              username: 'shopmanager',
              password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
            },
            qs: {
                force: 'true'
            }
          })
      })
}