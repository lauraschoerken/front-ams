import { describe, expect, it } from 'vitest'

import { createProduct } from '@/test/factories'

import { filterProducts } from './filterProducts'

const products = [
	createProduct({ id: 'apple', brand: 'Apple', model: 'iPhone 8' }),
	createProduct({ id: 'samsung', brand: 'Samsung', model: 'Galaxy S8' }),
]

describe('filterProducts', () => {
	it('filters products by brand ignoring case', () => {
		expect(filterProducts(products, 'apple')).toEqual([products[0]])
	})

	it('filters products by model', () => {
		expect(filterProducts(products, 'galaxy')).toEqual([products[1]])
	})

	it('returns every product for an empty search', () => {
		expect(filterProducts(products, '  ')).toEqual(products)
	})
})
