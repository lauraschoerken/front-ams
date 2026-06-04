import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { createProduct } from '@/test/factories'
import { renderWithProviders } from '@/test/renderWithProviders'

import { ProductCard } from './ProductCard'

describe('ProductCard', () => {
	it('renders product information and links to its detail', () => {
		const product = createProduct({ brand: 'Apple', model: 'iPhone 8' })

		renderWithProviders(<ProductCard product={product} />)

		expect(screen.getByRole('heading', { name: product.model })).toBeInTheDocument()
		expect(screen.getByRole('link')).toHaveAttribute('href', `/product/${product.id}`)
		expect(screen.getByRole('img')).toHaveAccessibleName(`${product.brand} ${product.model}`)
	})
})
