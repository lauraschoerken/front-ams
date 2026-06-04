import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { addProductToCart } from '@/services/cart'
import { createCartPayload } from '@/test/factories'
import { renderWithProviders } from '@/test/renderWithProviders'

import { CartProvider, useCart } from './CartContext'
import { getStoredCartCount } from './cartStorage'

vi.mock('@/services/cart', () => ({
	addProductToCart: vi.fn(),
}))

const CartConsumer = () => {
	const { count, addItem } = useCart()
	const payload = createCartPayload()

	return (
		<>
			<output aria-label='Cart count'>{count}</output>
			<button type='button' onClick={() => void addItem(payload)}>
				Add product
			</button>
		</>
	)
}

describe('CartProvider', () => {
	it('updates and persists the count returned by the API', async () => {
		const user = userEvent.setup()
		vi.mocked(addProductToCart).mockResolvedValue({ count: 4 })

		renderWithProviders(
			<CartProvider>
				<CartConsumer />
			</CartProvider>
		)

		await user.click(screen.getByRole('button', { name: 'Add product' }))

		await waitFor(() => expect(screen.getByRole('status', { name: 'Cart count' })).toHaveTextContent('4'))
		expect(getStoredCartCount()).toBe(4)
		expect(addProductToCart).toHaveBeenCalledWith(createCartPayload())
	})
})
