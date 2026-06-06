import '../components/ProductDetail.scss'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext, useParams } from 'react-router-dom'

import { EmptyState, ErrorState } from '@/components/elements'
import { NotFoundPage } from '@/components/NotFound/NotFoundPage'
import type { ProductDetail } from '@/models/product'
import { getProductById } from '@/services/products'

import { ProductActions } from '../components/ProductActions'
import { ProductDescription } from '../components/ProductDescription'
import { ProductDetailSkeleton } from '../components/ProductDetailSkeleton'
import { ProductImage } from '../components/ProductImage'

interface MainLayoutContext {
	setProductDetailLabel: (label?: string) => void
}

export const ProductDetailPage = () => {
	const { t } = useTranslation()
	const { id } = useParams()
	const { setProductDetailLabel } = useOutletContext<MainLayoutContext>()
	const [product, setProduct] = useState<ProductDetail | undefined>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | undefined>()
	const [notFound, setNotFound] = useState(false)

	const loadProduct = async (signal?: AbortSignal) => {
		if (!id) return

		setLoading(true)
		setError(undefined)
		setNotFound(false)

		const { data, error, status } = await getProductById(id, signal, setProduct)
		if (signal?.aborted) return

		if (data) {
			setProduct(data)
		}

		if (error) {
			if (status === 404 || status === 500) {
				setNotFound(true)
			} else {
				setError(error)
			}
		}

		setLoading(false)
	}

	useEffect(() => {
		const controller = new AbortController()
		void loadProduct(controller.signal)

		return () => controller.abort()
	}, [id])

	useEffect(() => {
		setProductDetailLabel(product ? `${product.brand} ${product.model}` : undefined)

		return () => setProductDetailLabel(undefined)
	}, [product, setProductDetailLabel])

	return (
		<section className='product-detail-page'>
			{loading && !product && <ProductDetailSkeleton label={t('productDetail.loading')} />}

			{notFound && !product && <NotFoundPage />}

			{error && !product && <ErrorState message={error} onRetry={() => void loadProduct()} />}

			{!loading && !error && !notFound && !product && (
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
							<div className='product-detail-page__heading'>
								<h1 className='product-detail-page__title'>{product.model}</h1>
								<p className='product-detail-page__price'>
									{t('product.priceWithCurrency', { price: product.price })}
								</p>
							</div>
						</header>

						<ProductDescription product={product} />
						<ProductActions productId={product.id} options={product.options} />
					</div>
				</div>
			)}
		</section>
	)
}
