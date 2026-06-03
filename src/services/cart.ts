import type { AddCartPayload, CartResponse } from '@/models/cart'

import { requestJson } from './http'

export const addProductToCart = (payload: AddCartPayload, signal?: AbortSignal) =>
	requestJson<CartResponse>('/api/cart', {
		method: 'POST',
		body: JSON.stringify(payload),
		signal,
	})
