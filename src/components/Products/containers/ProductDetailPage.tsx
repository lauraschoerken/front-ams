import '../components/ProductDetail.scss'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { EmptyState, ErrorState, LoadingState } from '@/components/elements'
import type { ProductDetail } from '@/models/product'
import { getProductById } from '@/services/products'

import { ProductActions } from '../components/ProductActions'
import { ProductDescription } from '../components/ProductDescription'
import { ProductImage } from '../components/ProductImage'

export const ProductDetailPage = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const [product, setProduct] = useState<ProductDetail | undefined>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | undefined>()

	const loadProduct = async (signal?: AbortSignal) => {
		if (!id) return

		setLoading(true)
		setError(undefined)

		const { data, error } = await getProductById(id, signal)

		if (data) {
			setProduct(data)
		}

		if (error) {
			setError(error)
		}

		setLoading(false)
	}

	useEffect(() => {
		const controller = new AbortController()
		void loadProduct(controller.signal)

		return () => controller.abort()
	}, [id])

	return (
		<section className='product-detail-page'>
			{loading && !product && <LoadingState label={t('productDetail.loading')} />}

			{error && !product && <ErrorState message={error} onRetry={() => void loadProduct()} />}

			{!loading && !error && !product && (
				<EmptyState
					title={t('productDetail.emptyTitle')}
					description={t('productDetail.emptyDescription')}
				/>
			)}

			{product && (
				<div className='product-detail-page__layout'>
					<ProductImage
						src={product.imgUrl}
						alt={t('product.imageAlt', { brand: product.brand, model: product.model })}
					/>

					<div className='product-detail-page__content'>
						<header className='product-detail-page__header'>
							<p className='product-detail-page__brand'>{product.brand}</p>
							<h1 className='product-detail-page__title'>{product.model}</h1>
							<p className='product-detail-page__price'>
								{t('product.priceWithCurrency', { price: product.price })}
							</p>
						</header>

						<ProductDescription product={product} />
						<ProductActions
							options={product.options}
							onAdd={(selection) => {
								console.info('Producto preparado para carrito', { id: product.id, ...selection })
							}}
						/>
					</div>
				</div>
			)}
		</section>
	)
}
