import type { ApiResult } from '@/models/api'
import type { ProductDetail, ProductSummary } from '@/models/product'
import { cacheStorage } from '@/storage/cache'

import { requestJson } from './http'

const PRODUCT_LIST_CACHE_KEY = 'front-ams:products:list'
const PRODUCT_DETAIL_CACHE_KEY = 'front-ams:products:detail'
const pendingRevalidations = new Map<string, Promise<unknown>>()

interface RevalidationResult<T> {
	data: T
	changed: boolean
}

const getErrorMessage = (error: unknown) =>
	error instanceof Error ? error.message : 'Error desconocido'

const fetchAndCache = async <T>(key: string, path: string, signal?: AbortSignal) => {
	const data = await requestJson<T>(path, { signal })
	cacheStorage.set(key, data)
	return data
}

const revalidateInBackground = <T>(
	key: string,
	path: string
): Promise<RevalidationResult<T> | undefined> => {
	const pendingRevalidation = pendingRevalidations.get(key)
	if (pendingRevalidation) return pendingRevalidation as Promise<RevalidationResult<T> | undefined>

	const revalidation = requestJson<T>(path)
		.then((data) => {
			const cachedValue = cacheStorage.getEntry<T>(key)?.value
			const changed = JSON.stringify(cachedValue) !== JSON.stringify(data)
			cacheStorage.set(key, data)
			return { data, changed }
		})
		.catch(() => undefined)
		.finally(() => pendingRevalidations.delete(key))

	pendingRevalidations.set(key, revalidation)
	return revalidation
}

export const getProducts = async (
	signal?: AbortSignal,
	onRevalidated?: (products: ProductSummary[]) => void
): Promise<ApiResult<ProductSummary[]>> => {
	const cachedProducts = cacheStorage.getEntry<ProductSummary[]>(PRODUCT_LIST_CACHE_KEY)
	if (cachedProducts) {
		if (cachedProducts.isStale) {
			void revalidateInBackground<ProductSummary[]>(PRODUCT_LIST_CACHE_KEY, '/api/product').then(
				(result) => {
					if (result?.changed && !signal?.aborted) onRevalidated?.(result.data)
				}
			)
		}

		return { data: cachedProducts.value }
	}

	try {
		const products = await fetchAndCache<ProductSummary[]>(PRODUCT_LIST_CACHE_KEY, '/api/product', signal)
		return { data: products }
	} catch (error) {
		if (signal?.aborted) return {}
		return { error: getErrorMessage(error) }
	}
}

export const getProductById = async (
	id: string,
	signal?: AbortSignal,
	onRevalidated?: (product: ProductDetail) => void
): Promise<ApiResult<ProductDetail>> => {
	const cacheKey = `${PRODUCT_DETAIL_CACHE_KEY}:${id}`
	const cachedProduct = cacheStorage.getEntry<ProductDetail>(cacheKey)
	if (cachedProduct) {
		if (cachedProduct.isStale) {
			void revalidateInBackground<ProductDetail>(cacheKey, `/api/product/${id}`).then((product) => {
				if (product?.changed && !signal?.aborted) onRevalidated?.(product.data)
			})
		}

		return { data: cachedProduct.value }
	}

	try {
		const product = await fetchAndCache<ProductDetail>(cacheKey, `/api/product/${id}`, signal)
		return { data: product }
	} catch (error) {
		if (signal?.aborted) return {}
		return { error: getErrorMessage(error) }
	}
}
