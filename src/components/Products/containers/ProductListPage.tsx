import '../components/ProductList.scss'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import { EmptyState, ErrorState } from '@/components/elements'
import type { ProductSummary } from '@/models/product'
import { getProducts } from '@/services/products'

import { Pagination } from '../components/Pagination'
import { ProductGrid } from '../components/ProductGrid'
import { ProductListSkeleton } from '../components/ProductListSkeleton'
import { Search } from '../components/Search'
import { filterProducts } from '../utils/filterProducts'
import { paginateItems } from '../utils/paginateItems'
import { getPageFromSearchParams, setPageInSearchParams } from '../utils/paginationSearchParams'

const PRODUCTS_PER_PAGE = 16

export const ProductListPage = () => {
	const { t } = useTranslation()
	const [searchParams, setSearchParams] = useSearchParams()
	const [products, setProducts] = useState<ProductSummary[]>([])
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | undefined>()
	const page = getPageFromSearchParams(searchParams)

	const filteredProducts = useMemo(() => filterProducts(products, search), [products, search])
	const pagination = useMemo(
		() => paginateItems(filteredProducts, page, PRODUCTS_PER_PAGE),
		[filteredProducts, page]
	)

	const loadProducts = async (signal?: AbortSignal) => {
		setLoading(true)
		setError(undefined)

		const { data, error } = await getProducts(signal, setProducts)
		if (signal?.aborted) return

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
	const hasRedundantPageParam = searchParams.has('page') && page === 1

	const changePage = (nextPage: number) => {
		setSearchParams(setPageInSearchParams(searchParams, nextPage))
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const changeSearch = (value: string) => {
		setSearch(value)
		setSearchParams(setPageInSearchParams(searchParams, 1))
	}

	useEffect(() => {
		if (
			!hasProducts ||
			loading ||
			(pagination.currentPage === page && !hasRedundantPageParam)
		) {
			return
		}

		setSearchParams(setPageInSearchParams(searchParams, pagination.currentPage), { replace: true })
	}, [
		hasProducts,
		hasRedundantPageParam,
		loading,
		page,
		pagination.currentPage,
		searchParams,
		setSearchParams,
	])

	return (
		<section className='products-page'>
			<header className='products-page__header'>
				<div>
					<h1 className='products-page__title'>{t('productsPage.title')}</h1>
					<p className='products-page__subtitle'>
						{t('productsPage.results', { count: filteredProducts.length })}
					</p>
				</div>
				<Search value={search} onChange={changeSearch} />
			</header>

			{loading && !hasProducts && <ProductListSkeleton label={t('productsPage.loading')} />}

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

			{hasFilteredProducts && (
				<>
					<ProductGrid products={pagination.items} />
					<Pagination
						currentPage={pagination.currentPage}
						totalPages={pagination.totalPages}
						onPageChange={changePage}
					/>
				</>
			)}
		</section>
	)
}
