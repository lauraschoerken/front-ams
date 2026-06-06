import { describe, expect, it } from 'vitest'

import {
	getPageFromSearchParams,
	getSearchFromSearchParams,
	setPageInSearchParams,
	setSearchInSearchParams,
} from './paginationSearchParams'

describe('paginationSearchParams', () => {
	it('uses the page query parameter when it is valid', () => {
		expect(getPageFromSearchParams(new URLSearchParams('page=4'))).toBe(4)
	})

	it('falls back to the first page for missing or invalid values', () => {
		expect(getPageFromSearchParams(new URLSearchParams())).toBe(1)
		expect(getPageFromSearchParams(new URLSearchParams('page=invalid'))).toBe(1)
		expect(getPageFromSearchParams(new URLSearchParams('page=-2'))).toBe(1)
	})

	it('removes page from the URL for the first page', () => {
		expect(setPageInSearchParams(new URLSearchParams('page=3'), 1).toString()).toBe('')
	})

	it('preserves other query parameters when changing page', () => {
		expect(setPageInSearchParams(new URLSearchParams('query=acer'), 3).toString()).toBe(
			'query=acer&page=3'
		)
	})

	it('reads the search query from q', () => {
		expect(getSearchFromSearchParams(new URLSearchParams('q=samsung'))).toBe('samsung')
		expect(getSearchFromSearchParams(new URLSearchParams())).toBe('')
	})

	it('stores search in q and resets pagination', () => {
		expect(setSearchInSearchParams(new URLSearchParams('page=3'), ' samsung ').toString()).toBe(
			'q=samsung'
		)
	})

	it('removes q when search is empty', () => {
		expect(setSearchInSearchParams(new URLSearchParams('q=acer&page=2'), ' ').toString()).toBe('')
	})
})
