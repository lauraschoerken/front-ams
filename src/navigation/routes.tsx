import { createBrowserRouter } from 'react-router-dom'

import { NotFoundPage } from '@/components/NotFound/NotFoundPage'
import { ProductDetailPage } from '@/components/Products/containers/ProductDetailPage'
import { ProductListPage } from '@/components/Products/containers/ProductListPage'
import { IndexLayout } from '@/layouts'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexLayout />,
		children: [
			{ index: true, element: <ProductListPage /> },
			{ path: 'product/:id', element: <ProductDetailPage /> },
			{ path: '*', element: <NotFoundPage /> },
		],
	},
])
