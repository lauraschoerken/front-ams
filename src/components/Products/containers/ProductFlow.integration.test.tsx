import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CartProvider } from '@/components/Cart/context/CartContext'
import { NotFoundPage } from '@/components/NotFound/NotFoundPage'
import i18n from '@/i18n/i18n'
import { MainLayout } from '@/layouts/Main/MainLayout'
import type { ProductDetail, ProductSummary } from '@/models/product'
import { createProduct, createProductDetail } from '@/test/factories'
import { ThemeProvider } from '@/utils/Theme/themeProvider'

import { ProductDetailPage } from './ProductDetailPage'
import { ProductListPage } from './ProductListPage'

const products = [
	createProduct({ id: 'acer-1', brand: 'Acer', model: 'Iconia Talk S' }),
	createProduct({ id: 'samsung-1', brand: 'Samsung', model: 'Galaxy S8' }),
	createProduct({ id: 'apple-1', brand: 'Apple', model: 'iPhone 8' }),
]

const productDetails: Record<string, ProductDetail> = {
	'acer-1': createProductDetail({
		...products[0],
		options: {
			colors: [
				{ code: 1000, name: 'Black' },
				{ code: 1001, name: 'White' },
			],
			storages: [
				{ code: 2000, name: '64 GB' },
				{ code: 2001, name: '128 GB' },
			],
		},
	}),
	'samsung-1': createProductDetail({ ...products[1] }),
}

const jsonResponse = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	})

const getPath = (input: RequestInfo | URL) => new URL(String(input)).pathname

const mockFetch = () => {
	const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
		const path = getPath(input)

		if (path === '/api/product') return jsonResponse(products)

		if (path.startsWith('/api/product/')) {
			const productId = path.split('/').at(-1) ?? ''
			const detail = productDetails[productId]

			return detail ? jsonResponse(detail) : jsonResponse({ message: 'Not found' }, 404)
		}

		if (path === '/api/cart' && init?.method === 'POST') return jsonResponse({ count: 3 })

		return jsonResponse({ message: 'Unhandled request' }, 500)
	})

	vi.stubGlobal('fetch', fetchMock)
	return fetchMock
}

const AppProviders = ({ children }: { children: ReactNode }) => (
	<ThemeProvider>
		<I18nextProvider i18n={i18n}>
			<CartProvider>{children}</CartProvider>
		</I18nextProvider>
	</ThemeProvider>
)

const renderProductApp = (initialEntry = '/') => {
	const router = createMemoryRouter(
		[
			{
				path: '/',
				element: <MainLayout />,
				children: [
					{ index: true, element: <ProductListPage /> },
					{ path: 'product/:id', element: <ProductDetailPage /> },
					{ path: '*', element: <NotFoundPage /> },
				],
			},
		],
		{ initialEntries: [initialEntry] }
	)

	render(
		<AppProviders>
			<RouterProvider router={router} />
		</AppProviders>
	)

	return router
}

const getProductFetchCalls = (fetchMock: ReturnType<typeof mockFetch>) =>
	fetchMock.mock.calls.filter(([input]) => getPath(input) === '/api/product')

describe('product purchase flow', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation((query: string) => ({
				addEventListener: vi.fn(),
				addListener: vi.fn(),
				dispatchEvent: vi.fn(),
				matches: false,
				media: query,
				onchange: null,
				removeEventListener: vi.fn(),
				removeListener: vi.fn(),
			})),
		})
		mockFetch()
	})

	it('renders products on the PLP', async () => {
		renderProductApp()

		expect(await screen.findByRole('heading', { name: 'Iconia Talk S' })).toBeInTheDocument()
		expect(screen.getByRole('heading', { name: 'Galaxy S8' })).toBeInTheDocument()
	})

	it('filters products by brand', async () => {
		const user = userEvent.setup()
		renderProductApp()

		await user.type(await screen.findByLabelText('Search by brand or model'), 'samsung')

		expect(screen.getByRole('heading', { name: 'Galaxy S8' })).toBeInTheDocument()
		expect(screen.queryByRole('heading', { name: 'Iconia Talk S' })).not.toBeInTheDocument()
	})

	it('filters products by model', async () => {
		const user = userEvent.setup()
		renderProductApp()

		await user.type(await screen.findByLabelText('Search by brand or model'), 'iphone')

		expect(screen.getByRole('heading', { name: 'iPhone 8' })).toBeInTheDocument()
		expect(screen.queryByRole('heading', { name: 'Galaxy S8' })).not.toBeInTheDocument()
	})

	it('initializes search from q', async () => {
		renderProductApp('/?q=samsung')

		expect(await screen.findByLabelText('Search by brand or model')).toHaveValue('samsung')
		expect(screen.getByRole('heading', { name: 'Galaxy S8' })).toBeInTheDocument()
		expect(screen.queryByRole('heading', { name: 'Iconia Talk S' })).not.toBeInTheDocument()
	})

	it('updates the URL when typing in search', async () => {
		const user = userEvent.setup()
		const router = renderProductApp()

		await user.type(await screen.findByLabelText('Search by brand or model'), 'samsung')

		await waitFor(() => expect(router.state.location.search).toBe('?q=samsung'))
	})

	it('keeps search when navigating to PDP and back through breadcrumbs', async () => {
		const user = userEvent.setup()
		const router = renderProductApp('/?q=samsung')

		await user.click(await screen.findByRole('link', { name: /Galaxy S8/ }))
		expect(await screen.findByRole('heading', { name: 'Galaxy S8' })).toBeInTheDocument()

		const breadcrumbLink = screen
			.getAllByRole('link', { name: 'Products' })
			.find((link) => link.getAttribute('href') === '/?q=samsung')

		expect(breadcrumbLink).toBeDefined()
		await user.click(breadcrumbLink!)

		expect(router.state.location.pathname).toBe('/')
		expect(router.state.location.search).toBe('?q=samsung')
		expect(await screen.findByLabelText('Search by brand or model')).toHaveValue('samsung')
	})

	it('shows PDP detail, options and add button', async () => {
		renderProductApp('/product/acer-1')

		expect(await screen.findByRole('heading', { name: 'Iconia Talk S' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Black' })).toHaveAttribute('aria-pressed', 'true')
		expect(screen.getByRole('button', { name: 'White' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: '64 GB' })).toHaveAttribute('aria-pressed', 'true')
		expect(screen.getByRole('button', { name: '128 GB' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
	})

	it('posts selected options to cart and updates the header count', async () => {
		const user = userEvent.setup()
		const fetchMock = mockFetch()
		renderProductApp('/product/acer-1')

		await user.click(await screen.findByRole('button', { name: '128 GB' }))
		await user.click(screen.getByRole('button', { name: 'White' }))
		await user.click(screen.getByRole('button', { name: 'Add' }))

		await waitFor(() => expect(screen.getByLabelText('Cart items')).toHaveTextContent('3'))
		expect(fetchMock).toHaveBeenCalledWith(
			expect.stringContaining('/api/cart'),
			expect.objectContaining({
				method: 'POST',
				body: JSON.stringify({ id: 'acer-1', colorCode: 1001, storageCode: 2001 }),
			})
		)
	})

	it('uses cached PLP data inside one hour and revalidates after the TTL', async () => {
		const fetchMock = mockFetch()
		const cacheKey = 'front-ams:products:list'

		const firstRouter = renderProductApp()
		await screen.findByRole('heading', { name: 'Iconia Talk S' })
		expect(getProductFetchCalls(fetchMock)).toHaveLength(1)
		firstRouter.dispose()
		cleanup()

		renderProductApp()
		await screen.findByRole('heading', { name: 'Iconia Talk S' })
		expect(getProductFetchCalls(fetchMock)).toHaveLength(1)
		cleanup()

		const cachedProducts = JSON.parse(window.localStorage.getItem(cacheKey) ?? '{}') as {
			expiresAt: number
			value: ProductSummary[]
		}
		window.localStorage.setItem(
			cacheKey,
			JSON.stringify({ ...cachedProducts, expiresAt: Date.now() - 1 })
		)

		renderProductApp()
		await vi.waitFor(() => expect(getProductFetchCalls(fetchMock)).toHaveLength(2))
	})
})
