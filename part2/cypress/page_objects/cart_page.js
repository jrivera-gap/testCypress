/// <reference types="Cypress" />

export function validateQuantityCart(count){
    cy.get('.quantity input').then(($value) => {
        let inputValue = Number($value.val())
        expect(inputValue).to.equal(count)
    })
}

export function validateProductListed(product_name){
    cy.get('.product-name > a').should('have.text', product_name)
}

export function validatePrice(price){
    cy.get('.product-price > .woocommerce-Price-amount').should('have.text', price)
}

export function fillCouponCode(code){
    cy.get('#coupon_code').type(code)
}

export function createCouponApi(){
    cy.request({
        method: 'POST',
        url: 'http://34.205.174.166/wp-json/wc/v3/coupons', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        auth: {
          username: 'shopmanager',
          password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
        },
        qs: {
            code: '100off_jack',
            discount_type: 'percent',
            amount: '100',
            individual_use: 'true',
            exclude_sale_items: 'true',
            minimum_amount: '1.00' 
        }
      })
}

export function validateDiscount(){
    cy.get('.woocommerce-message').should('include.text', "Coupon code applied successfully.")
}

export function deleteCouponApi(){
    cy.request({
        method: 'GET',
        url: 'http://34.205.174.166/wp-json/wc/v3/coupons/', // baseUrl is prepended to url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        auth: {
          username: 'shopmanager',
          password: 'Duux PIEd eUlK Lmin cR3c 5i1h'
        },
        qs: {
            search: '100off_Jack'
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