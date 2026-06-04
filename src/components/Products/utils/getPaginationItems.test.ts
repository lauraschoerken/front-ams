import { describe, expect, it } from 'vitest'

import { getPaginationItems } from './getPaginationItems'

describe('getPaginationItems', () => {
	it('shows three previous and next pages around the current page', () => {
		expect(getPaginationItems(8, 17)).toEqual([
			1,
			'ellipsis-start',
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			'ellipsis-end',
			17,
		])
	})

	it('avoids an ellipsis when the visible range reaches an edge', () => {
		expect(getPaginationItems(2, 10)).toEqual([1, 2, 3, 4, 5, 'ellipsis-end', 10])
		expect(getPaginationItems(9, 10)).toEqual([1, 'ellipsis-start', 6, 7, 8, 9, 10])
	})
})
