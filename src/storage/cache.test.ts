import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createProduct } from '@/test/factories'

import { CACHE_TTL, cacheStorage } from './cache'

describe('cacheStorage', () => {
	const cacheKey = 'products'
	const product = createProduct()

	beforeEach(() => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date('2026-01-01T10:00:00Z'))
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('returns a cached value before it expires', () => {
		cacheStorage.set(cacheKey, product, 1_000)

		expect(cacheStorage.get(cacheKey)).toEqual(product)
	})

	it('stores an expiration timestamp one hour ahead by default', () => {
		cacheStorage.set(cacheKey, product)

		const cachedItem = JSON.parse(window.localStorage.getItem(cacheKey) ?? '{}') as {
			expiresAt: number
		}

		expect(cachedItem.expiresAt).toBe(Date.now() + CACHE_TTL)
	})

	it('keeps an expired value available for background revalidation', () => {
		cacheStorage.set(cacheKey, product, 1_000)
		vi.advanceTimersByTime(1_001)

		expect(cacheStorage.get(cacheKey)).toBeUndefined()
		expect(cacheStorage.getEntry(cacheKey)).toEqual({
			value: product,
			isStale: true,
		})
		expect(window.localStorage.getItem(cacheKey)).not.toBeNull()
	})
})
