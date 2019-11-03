/// <reference types="Cypress" />

import { navigateProduct, validateProductPageDisplayed, increaseQuantity, addToCart, applyCoupon, deleteProductApi, createProductApi } from "../page_objects/product_detail_page"
import { goToCartIcon } from "../page_objects/navbar_page"
import { validateProductListed, validatePrice, validateQuantityCart, fillCouponCode, createCouponApi, deleteCouponApi, validateDiscount } from "../page_objects/cart_page"

describe('Products', () => {
    beforeEach(() => {
        createProductApi()
    })

    afterEach(() => {
        deleteProductApi()
    })

    it('Validate that a product can be added to the shopping cart', () => {
        navigateProduct("jack")
        validateProductPageDisplayed("Jack")
        increaseQuantity(7)
        addToCart()
        goToCartIcon()
        validateProductListed("Jack")
        validatePrice("$35.00")
        validateQuantityCart(7)
    })
})

describe('Discount', () => {
    beforeEach(() => {
        createCouponApi()
        createProductApi()
    })

    afterEach(() => {
        deleteProductApi()
        deleteCouponApi()
    })
    it('Validate coupon', () => {
        navigateProduct("jack")
        validateProductPageDisplayed("Jack")
        increaseQuantity(2)
        addToCart()
        goToCartIcon()
        validateProductListed("Jack")
        fillCouponCode("100off_Jack")
        applyCoupon()
        validateDiscount()
    })
})