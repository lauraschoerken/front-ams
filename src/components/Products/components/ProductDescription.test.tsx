import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import i18n from '@/i18n/i18n'
import { createProductDetail } from '@/test/factories'
import { renderWithProviders } from '@/test/renderWithProviders'

import { ProductDescription } from './ProductDescription'

describe('ProductDescription', () => {
	it('keeps required fields visible and expands additional API details on demand', async () => {
		const user = userEvent.setup()
		const networkTechnology = '5G'
		const product = createProductDetail({
			networkTechnology,
			chipset: 'Test chipset',
		})

		const { container } = renderWithProviders(<ProductDescription product={product} />)
		const additionalDetails = container.querySelector('#additional-product-details')

		expect(screen.getByText(product.cpu)).toBeInTheDocument()
		expect(additionalDetails).toHaveAttribute('aria-hidden', 'true')

		await user.click(
			screen.getByRole('button', {
				name: i18n.t('product.showAdditionalDetails', { count: 2 }),
			})
		)

		expect(screen.getByText(networkTechnology)).toBeInTheDocument()
		expect(additionalDetails).toHaveAttribute('aria-hidden', 'false')
		expect(
			screen.getByRole('button', { name: i18n.t('product.hideAdditionalDetails') })
		).toHaveAttribute('aria-expanded', 'true')
	})
})
