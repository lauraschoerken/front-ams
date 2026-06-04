import { createContext, type ReactNode, useContext, useMemo, useState } from 'react'

import type { AddCartPayload } from '@/models/cart'
import { addProductToCart } from '@/services/cart'

import { getStoredCartCount, storeCartCount } from './cartStorage'

interface CartContextValue {
	count: number
	addItem: (payload: AddCartPayload) => Promise<void>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [count, setCount] = useState(() => getStoredCartCount())

	const value = useMemo<CartContextValue>(
		() => ({
			count,
			addItem: async (payload) => {
				const response = await addProductToCart(payload)
				setCount(response.count)
				storeCartCount(response.count)
			},
		}),
		[count]
	)

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
	const context = useContext(CartContext)

	if (!context) {
		throw new Error('useCart must be used within CartProvider')
	}

	return context
}
