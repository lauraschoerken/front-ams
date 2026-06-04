import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { CartProvider } from '@/components/Cart/context/CartContext'
import { addProductToCart } from '@/services/cart'
import { getProductById } from '@/services/products'
import { createProduct, createProductDetail } from '@/test/factories'
import { renderWithProviders } from '@/test/renderWithProviders'

import { ProductQuickAddModal } from './ProductQuickAddModal'

vi.mock('@/services/products', () => ({
	getProductById: vi.fn(),
}))

vi.mock('@/services/cart', () => ({
	addProductToCart: vi.fn(),
}))

const QuickAddHarness = ({ product }: { product: ReturnType<typeof createProduct> }) => {
	const [open, setOpen] = useState(true)

	return <ProductQuickAddModal product={product} open={open} onClose={() => setOpen(false)} />
}

describe('ProductQuickAddModal', () => {
	it('loads and displays the product options', async () => {
		const product = createProduct({ brand: 'Acer', model: 'Iconia' })
		vi.mocked(getProductById).mockResolvedValue({
			data: createProductDetail({
				...product,
				options: {
					storages: [{ code: 10, name: '128 GB' }],
					colors: [{ code: 20, name: 'Silver' }],
				},
			}),
		})

		renderWithProviders(
			<CartProvider>
				<ProductQuickAddModal product={product} open onClose={vi.fn()} />
			</CartProvider>
		)

		expect(await screen.findByRole('dialog')).toBeInTheDocument()
		expect(await screen.findByRole('button', { name: '128 GB' })).toHaveAttribute(
			'aria-pressed',
			'true'
		)
		expect(screen.getByRole('button', { name: 'Silver' })).toHaveAttribute(
			'aria-pressed',
			'true'
		)
	})

	it('closes after adding and keeps the success alert visible', async () => {
		const user = userEvent.setup()
		const product = createProduct({ brand: 'Acer', model: 'Iconia' })
		vi.mocked(getProductById).mockResolvedValue({ data: createProductDetail(product) })
		vi.mocked(addProductToCart).mockResolvedValue({ count: 1 })

		renderWithProviders(
			<CartProvider>
				<QuickAddHarness product={product} />
			</CartProvider>
		)

		await user.click(await screen.findByRole('button', { name: 'Add' }))

		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
		expect(screen.getByRole('status')).toHaveTextContent('Product added to cart')
	})
})
