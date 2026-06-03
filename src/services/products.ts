import type { ApiResult } from '@/models/api'
import type { ProductDetail, ProductSummary } from '@/models/product'
import { cacheStorage } from '@/storage/cache'

import { requestJson } from './http'

const PRODUCT_LIST_CACHE_KEY = 'front-ams:products:list'
const PRODUCT_DETAIL_CACHE_KEY = 'front-ams:products:detail'

const getErrorMessage = (error: unknown) =>
	error instanceof Error ? error.message : 'Error desconocido'

export const getProducts = async (signal?: AbortSignal): Promise<ApiResult<ProductSummary[]>> => {
	const cachedProducts = cacheStorage.get<ProductSummary[]>(PRODUCT_LIST_CACHE_KEY)
	if (cachedProducts) {
		return { data: cachedProducts }
	}

	try {
		const products = await requestJson<ProductSummary[]>('/api/product', { signal })
		cacheStorage.set(PRODUCT_LIST_CACHE_KEY, products)
		return { data: products }
	} catch (error) {
		return { error: getErrorMessage(error) }
	}
}

export const getProductById = async (
	id: string,
	signal?: AbortSignal
): Promise<ApiResult<ProductDetail>> => {
	const cacheKey = `${PRODUCT_DETAIL_CACHE_KEY}:${id}`
	const cachedProduct = cacheStorage.get<ProductDetail>(cacheKey)
	if (cachedProduct) {
		return { data: cachedProduct }
	}

	try {
		const product = await requestJson<ProductDetail>(`/api/product/${id}`, { signal })
		cacheStorage.set(cacheKey, product)
		return { data: product }
	} catch (error) {
		return { error: getErrorMessage(error) }
	}
}
