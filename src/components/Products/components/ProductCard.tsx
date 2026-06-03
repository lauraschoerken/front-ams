import './ProductCard.scss'

import { Link } from 'react-router-dom'

import type { ProductSummary } from '@/models/product'

interface ProductCardProps {
	product: ProductSummary
}

const formatPrice = (price: ProductSummary['price']) => {
	if (price === '' || price === undefined || price === null) return 'Precio no disponible'

	return typeof price === 'number' ? `${price} EUR` : `${price} EUR`
}

export const ProductCard = ({ product }: ProductCardProps) => (
	<Link className='product-card' to={`/product/${product.id}`}>
		<div className='product-card__image-wrap'>
			<img className='product-card__image' src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
		</div>
		<div className='product-card__content'>
			<p className='product-card__brand'>{product.brand}</p>
			<h2 className='product-card__model'>{product.model}</h2>
			<p className='product-card__price'>{formatPrice(product.price)}</p>
		</div>
	</Link>
)
