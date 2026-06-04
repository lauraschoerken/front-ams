import type { ProductSummary } from '@/models/product'

export const filterProducts = (products: ProductSummary[], search: string) => {
	const normalizedSearch = search.trim().toLowerCase()
	if (!normalizedSearch) return products

	return products.filter((product) =>
		`${product.brand} ${product.model}`.toLowerCase().includes(normalizedSearch)
	)
}
