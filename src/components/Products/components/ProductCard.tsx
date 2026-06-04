import './ProductCard.scss'

import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import type { ProductSummary } from '@/models/product'

import { ProductQuickAddModal } from './ProductQuickAddModal'

interface ProductCardProps {
	product: ProductSummary
}

const hasPrice = (price: ProductSummary['price']) => price !== '' && price !== undefined && price !== null

export const ProductCard = ({ product }: ProductCardProps) => {
	const { t } = useTranslation()
	const { pathname, search } = useLocation()
	const [quickAddOpen, setQuickAddOpen] = useState(false)

	return (
		<article className='product-card'>
			<Link
				className='product-card__link'
				to={`/product/${product.id}`}
				state={{ productListPath: `${pathname}${search}` }}>
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

			<button
				className='product-card__quick-add'
				type='button'
				aria-label={t('product.quickAddLabel', { brand: product.brand, model: product.model })}
				title={t('product.quickAdd')}
				onClick={() => setQuickAddOpen(true)}>
				<ShoppingCart aria-hidden='true' />
			</button>

			<ProductQuickAddModal
				product={product}
				open={quickAddOpen}
				onClose={() => setQuickAddOpen(false)}
			/>
		</article>
	)
}
