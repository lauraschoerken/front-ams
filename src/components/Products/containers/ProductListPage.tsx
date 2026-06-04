import '../components/ProductList.scss'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EmptyState, ErrorState, LoadingState } from '@/components/elements'
import type { ProductSummary } from '@/models/product'
import { getProducts } from '@/services/products'

import { ProductGrid } from '../components/ProductGrid'
import { Search } from '../components/Search'
import { filterProducts } from '../utils/filterProducts'

export const ProductListPage = () => {
	const { t } = useTranslation()
	const [products, setProducts] = useState<ProductSummary[]>([])
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | undefined>()

	const filteredProducts = useMemo(() => filterProducts(products, search), [products, search])

	const loadProducts = async (signal?: AbortSignal) => {
		setLoading(true)
		setError(undefined)

		const { data, error } = await getProducts(signal)

		if (data) {
			setProducts(data)
		}

		if (error) {
			setError(error)
		}

		setLoading(false)
	}

	useEffect(() => {
		const controller = new AbortController()
		void loadProducts(controller.signal)

		return () => controller.abort()
	}, [])

	const hasProducts = products.length > 0
	const hasFilteredProducts = filteredProducts.length > 0

	return (
		<section className='products-page'>
			<header className='products-page__header'>
				<div>
					<h1 className='products-page__title'>{t('productsPage.title')}</h1>
					<p className='products-page__subtitle'>
						{t('productsPage.results', { count: filteredProducts.length })}
					</p>
				</div>
				<Search value={search} onChange={setSearch} />
			</header>

			{loading && !hasProducts && <LoadingState label={t('productsPage.loading')} />}

			{error && !hasProducts && <ErrorState message={error} onRetry={() => void loadProducts()} />}

			{!loading && !error && !hasProducts && (
				<EmptyState
					title={t('productsPage.emptyTitle')}
					description={t('productsPage.emptyDescription')}
				/>
			)}

			{hasProducts && !hasFilteredProducts && (
				<EmptyState
					title={t('productsPage.noResultsTitle')}
					description={t('productsPage.noResultsDescription')}
				/>
			)}

			{hasFilteredProducts && <ProductGrid products={filteredProducts} />}
		</section>
	)
}
