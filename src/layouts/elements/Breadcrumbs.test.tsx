import { within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithProviders } from '@/test/renderWithProviders'

import { Breadcrumbs } from './Breadcrumbs'

describe('Breadcrumbs', () => {
	it('does not show a redundant breadcrumb on the product list', () => {
		const { container } = renderWithProviders(<Breadcrumbs />, {
			initialEntries: ['/'],
		})

		expect(within(container).queryByRole('navigation')).not.toBeInTheDocument()
	})

	it('links back to the product list page used to open the detail', () => {
		const { container } = renderWithProviders(<Breadcrumbs productDetailLabel='Acer Iconia Talk S' />, {
			initialEntries: [
				{
					pathname: '/product/product-id',
					state: { productListPath: '/?page=5' },
				},
			],
		})

		expect(within(container).getByRole('link', { name: 'Products' })).toHaveAttribute(
			'href',
			'/?page=5'
		)
	})

	it('links back to the first page when the detail was opened directly', () => {
		const { container } = renderWithProviders(<Breadcrumbs productDetailLabel='Acer Iconia Talk S' />, {
			initialEntries: ['/product/product-id'],
		})

		expect(within(container).getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/')
	})
})
