import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cacheStorage } from '@/storage/cache'
import { createProduct } from '@/test/factories'

import { ApiError } from '../models/api'
import { requestJson } from './http'
import { getProducts } from './products'

vi.mock('./http', () => ({
	requestJson: vi.fn(),
}))

describe('products cache revalidation', () => {
	const cacheKey = 'front-ams:products:list'

	beforeEach(() => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date('2026-01-01T10:00:00Z'))
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('returns stale products immediately and updates them in the background', async () => {
		const staleProducts = [createProduct({ model: 'Old model' })]
		const freshProducts = [createProduct({ model: 'New model' })]
		const onRevalidated = vi.fn()
		cacheStorage.set(cacheKey, staleProducts, 1_000)
		vi.advanceTimersByTime(1_001)
		vi.mocked(requestJson).mockResolvedValue(freshProducts)

		await expect(getProducts(undefined, onRevalidated)).resolves.toEqual({ data: staleProducts })

		await vi.waitFor(() => expect(onRevalidated).toHaveBeenCalledWith(freshProducts))
		expect(cacheStorage.get(cacheKey)).toEqual(freshProducts)
	})

	it('renews unchanged products without repainting the view', async () => {
		const products = [createProduct()]
		const onRevalidated = vi.fn()
		cacheStorage.set(cacheKey, products, 1_000)
		vi.advanceTimersByTime(1_001)
		vi.mocked(requestJson).mockResolvedValue(products)

		await getProducts(undefined, onRevalidated)
		await vi.waitFor(() => expect(cacheStorage.get(cacheKey)).toEqual(products))

		expect(onRevalidated).not.toHaveBeenCalled()
	})

	it('preserves the API status when loading products fails', async () => {
		vi.mocked(requestJson).mockRejectedValue(new ApiError('HTTP 500', 500))

		await expect(getProducts()).resolves.toEqual({ error: 'HTTP 500', status: 500 })
	})
})
