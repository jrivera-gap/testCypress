/// <reference types="Cypress" />

import { searchProduct, navigateHome } from "../page_objects/home_page"
import { validateSearchResultPageDisplayed, validateListItemsCount, navigateToProduct } from "../page_objects/search_results_page"
import { validateProductPageDisplayed } from "../page_objects/product_detail_page"

describe('Search', () => {
    beforeEach(() => {
        navigateHome()
    })

    it('Search for Hoodie products and navigate to the detail page', () => {
        searchProduct("Hoodie")
        validateSearchResultPageDisplayed()
        validateListItemsCount(4)
        navigateToProduct('Hoodie with Pocket')
        validateProductPageDisplayed('Hoodie with Pocket')
    })
})
