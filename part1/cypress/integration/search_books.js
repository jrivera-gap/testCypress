/// <reference types="Cypress" />

import { navigateHome, search, validateBookTitle, validateBookAuthor } from "../page_objects/search_page"

describe('Book Search', () => {
    beforeEach(() => {
        navigateHome()
    })

    it('Search for book title', () => {
        search("JavaScript For Testers")
        validateBookTitle("JavaScript For Testers")
    })

    it('Search for book author', () => {
        search("Stephen Hawking")
        validateBookAuthor("Stephen Hawking")
    })
})





