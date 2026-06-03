import '../components/ProductList.scss'

import { useEffect, useMemo, useState } from 'react'

import { EmptyState, ErrorState, LoadingState } from '@/components/elements'
import type { ProductSummary } from '@/models/product'
import { getProducts } from '@/services/products'

import { ProductGrid } from '../components/ProductGrid'
import { Search } from '../components/Search'

const filterProducts = (products: ProductSummary[], search: string) => {
	const normalizedSearch = search.trim().toLowerCase()
	if (!normalizedSearch) return products

	return products.filter((product) =>
		`${product.brand} ${product.model}`.toLowerCase().includes(normalizedSearch)
	)
}

export const ProductListPage = () => {
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
					<h1 className='products-page__title'>Dispositivos moviles</h1>
					<p className='products-page__subtitle'>{filteredProducts.length} productos encontrados</p>
				</div>
				<Search value={search} onChange={setSearch} />
			</header>

			{loading && !hasProducts && <LoadingState label='Cargando productos' />}

			{error && !hasProducts && <ErrorState message={error} onRetry={() => void loadProducts()} />}

			{!loading && !error && !hasProducts && (
				<EmptyState title='No hay productos disponibles' description='Prueba a recargar la pagina.' />
			)}

			{hasProducts && !hasFilteredProducts && (
				<EmptyState
					title='No hay resultados para la busqueda'
					description='Busca por otra marca o modelo.'
				/>
			)}

			{hasFilteredProducts && <ProductGrid products={filteredProducts} />}
		</section>
	)
}
