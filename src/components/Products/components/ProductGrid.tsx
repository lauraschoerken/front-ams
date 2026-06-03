import './ProductGrid.scss'

import type { ProductSummary } from '@/models/product'

import { ProductCard } from './ProductCard'

interface ProductGridProps {
	products: ProductSummary[]
}

export const ProductGrid = ({ products }: ProductGridProps) => (
	<div className='product-grid'>
		{products.map((product) => (
			<ProductCard key={product.id} product={product} />
		))}
	</div>
)
