import { describe, expect, it } from 'vitest'

import { getStoredCartCount, storeCartCount } from './cartStorage'

describe('cartStorage', () => {
	it('persists and retrieves the cart count', () => {
		storeCartCount(3)

		expect(getStoredCartCount()).toBe(3)
	})

	it('returns zero when the stored value is invalid', () => {
		storeCartCount(Number.NaN)

		expect(getStoredCartCount()).toBe(0)
	})
})
