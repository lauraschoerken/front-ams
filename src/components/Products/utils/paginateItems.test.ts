import { describe, expect, it } from 'vitest'

import { paginateItems } from './paginateItems'

const items = Array.from({ length: 25 }, (_, index) => index + 1)

describe('paginateItems', () => {
	it('returns the requested page', () => {
		expect(paginateItems(items, 2, 10)).toEqual({
			currentPage: 2,
			items: items.slice(10, 20),
			totalPages: 3,
		})
	})

	it('clamps a page outside the available range', () => {
		expect(paginateItems(items, 10, 10).currentPage).toBe(3)
	})

	it('returns an empty first page when there are no items', () => {
		expect(paginateItems([], 1, 12)).toEqual({
			currentPage: 1,
			items: [],
			totalPages: 1,
		})
	})
})
