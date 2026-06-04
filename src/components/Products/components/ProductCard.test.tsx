import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { createProduct } from '@/test/factories'
import { renderWithProviders } from '@/test/renderWithProviders'

import { ProductCard } from './ProductCard'

const NavigationState = () => {
	const { state } = useLocation()

	return <output>{JSON.stringify(state)}</output>
}

describe('ProductCard', () => {
	it('renders product information and links to its detail', async () => {
		const user = userEvent.setup()
		const product = createProduct({ brand: 'Apple', model: 'iPhone 8' })

		renderWithProviders(
			<>
				<ProductCard product={product} />
				<NavigationState />
			</>,
			{ initialEntries: ['/?page=5'] }
		)

		expect(screen.getByRole('heading', { name: product.model })).toBeInTheDocument()
		expect(screen.getByRole('link')).toHaveAttribute('href', `/product/${product.id}`)
		expect(screen.getByRole('img')).toHaveAccessibleName(`${product.brand} ${product.model}`)
		expect(
			screen.getByRole('button', { name: `Add ${product.brand} ${product.model} to cart` })
		).toBeInTheDocument()

		await user.click(screen.getByRole('link'))

		expect(screen.getByRole('status')).toHaveTextContent('{"productListPath":"/?page=5"}')
	})
})
