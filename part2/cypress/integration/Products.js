/// <reference types="Cypress" />

import { navigateProduct, validateProductPageDisplayed, increaseQuantity, addToCart, deleteProductApi, createProductApi } from "../page_objects/product_detail_page"
import { goToCartIcon } from "../page_objects/navbar_page"
import { validateProductListed, validatePrice, validateQuantityCart, fillCouponCode, createCouponApi, deleteCouponApi, validateDiscount, applyCoupon } from "../page_objects/cart_page"

describe('Products', () => {
    beforeEach(() => {
        createProductApi("Jack", "35.00", "This is the best T-shirt ever")
    })

    afterEach(() => {
        deleteProductApi("Jack")
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
        createProductApi("Jack", "35.00", "This is the best T-shirt ever")
        createCouponApi("100off_Jack", "100", "30")
    })

    afterEach(() => {
        deleteProductApi("Jack")
        deleteCouponApi("100off_Jack")
    })
    it('Validate coupon', () => {
        navigateProduct("jack")
        validateProductPageDisplayed("Jack")
        increaseQuantity(31)
        addToCart()
        goToCartIcon()
        validateProductListed("Jack")
        fillCouponCode("100off_Jack")
        applyCoupon()
        validateDiscount()
    })
})