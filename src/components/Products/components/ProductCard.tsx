import './ProductCard.scss'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import type { ProductSummary } from '@/models/product'

interface ProductCardProps {
	product: ProductSummary
}

const hasPrice = (price: ProductSummary['price']) => price !== '' && price !== undefined && price !== null

export const ProductCard = ({ product }: ProductCardProps) => {
	const { t } = useTranslation()

	return (
		<Link className='product-card' to={`/product/${product.id}`}>
			<div className='product-card__image-wrap'>
				<img
					className='product-card__image'
					src={product.imgUrl}
					alt={t('product.imageAlt', { brand: product.brand, model: product.model })}
				/>
			</div>
			<div className='product-card__content'>
				<p className='product-card__brand'>{product.brand}</p>
				<h2 className='product-card__model'>{product.model}</h2>
				<p className='product-card__price'>
					{hasPrice(product.price)
						? t('product.priceWithCurrency', { price: product.price })
						: t('product.priceUnavailable')}
				</p>
			</div>
		</Link>
	)
}
