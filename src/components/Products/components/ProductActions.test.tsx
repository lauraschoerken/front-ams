import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CartProvider } from '@/components/Cart/context/CartContext'
import { addProductToCart } from '@/services/cart'
import { renderWithProviders } from '@/test/renderWithProviders'

import { ProductActions } from './ProductActions'

vi.mock('@/services/cart', () => ({
	addProductToCart: vi.fn(),
}))

describe('ProductActions', () => {
	it('adds the selected visual options to the cart', async () => {
		const user = userEvent.setup()
		vi.mocked(addProductToCart).mockResolvedValue({ count: 1 })

		renderWithProviders(
			<CartProvider>
				<ProductActions
					productId='product-id'
					options={{
						storages: [
							{ code: 10, name: '64 GB' },
							{ code: 20, name: '128 GB' },
						],
						colors: [
							{ code: 30, name: 'Black' },
							{ code: 40, name: 'Silver' },
						],
					}}
				/>
			</CartProvider>
		)

		await user.click(screen.getByRole('button', { name: '128 GB' }))
		await user.click(screen.getByRole('button', { name: 'Silver' }))
		await user.click(screen.getByRole('button', { name: 'Add' }))

		await waitFor(() =>
			expect(addProductToCart).toHaveBeenCalledWith({
				id: 'product-id',
				storageCode: 20,
				colorCode: 40,
			})
		)
	})
})
