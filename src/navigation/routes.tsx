import { createBrowserRouter } from 'react-router-dom'

import { ProductDetailPage } from '@/components/Products/containers/ProductDetailPage'
import { ProductListPage } from '@/components/Products/containers/ProductListPage'
import { IndexLayout } from '@/layouts'

import Demo from '../components/Demo/containers/Demo'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <IndexLayout />,
		children: [
			{ index: true, element: <ProductListPage /> },
			{ path: 'product/:id', element: <ProductDetailPage /> },
			// { path: '*', element: <NotFound /> },
		],
	},
	{
		path: '/demo',
		element: <IndexLayout layout='minimal' />,
		children: [{ index: true, element: <Demo /> }],
	},
])
