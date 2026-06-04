import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'

import i18n from '@/i18n/i18n'

interface ProviderOptions extends Omit<RenderOptions, 'wrapper'> {
	initialEntries?: MemoryRouterProps['initialEntries']
}

export const renderWithProviders = (
	element: ReactElement,
	{ initialEntries = ['/'], ...renderOptions }: ProviderOptions = {}
) => {
	const Providers = ({ children }: { children: ReactNode }) => (
		<I18nextProvider i18n={i18n}>
			<MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
		</I18nextProvider>
	)

	return render(element, { wrapper: Providers, ...renderOptions })
}
