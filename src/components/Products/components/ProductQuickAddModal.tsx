import './ProductQuickAddModal.scss'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Alert, ErrorState, LoadingState } from '@/components/elements'
import type { ProductDetail, ProductSummary } from '@/models/product'
import { getProductById } from '@/services/products'

import { ProductActions } from './ProductActions'

interface ProductQuickAddModalProps {
	product: ProductSummary
	open: boolean
	onClose: () => void
}

export const ProductQuickAddModal = ({ product, open, onClose }: ProductQuickAddModalProps) => {
	const { t } = useTranslation()
	const [detail, setDetail] = useState<ProductDetail | undefined>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | undefined>()
	const [added, setAdded] = useState(false)

	const loadProduct = async (signal?: AbortSignal) => {
		setLoading(true)
		setError(undefined)

		const result = await getProductById(product.id, signal, setDetail)
		if (signal?.aborted) return

		setDetail(result.data)
		setError(result.error)
		setLoading(false)
	}

	useEffect(() => {
		if (!open) return

		setAdded(false)
		const controller = new AbortController()
		void loadProduct(controller.signal)

		return () => controller.abort()
	}, [open, product.id])

	useEffect(() => {
		if (!open) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleKeyDown)
		document.body.style.overflow = 'hidden'

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			document.body.style.overflow = ''
		}
	}, [onClose, open])

	const successAlert = added
		? createPortal(<Alert onClose={() => setAdded(false)}>{t('cartAdd.success')}</Alert>, document.body)
		: null

	if (!open) return successAlert

	return (
		<>
			{createPortal(
				<div
					className='quick-add-modal__backdrop'
					onMouseDown={(event) => {
						if (event.target === event.currentTarget) onClose()
					}}>
					<section
						className='quick-add-modal'
						role='dialog'
						aria-modal='true'
						aria-labelledby='quick-add-modal-title'>
						<header className='quick-add-modal__header'>
							<div>
								<p>{product.brand}</p>
								<h2 id='quick-add-modal-title'>
									{t('product.quickAddTitle', { model: product.model })}
								</h2>
							</div>
							<button
								className='quick-add-modal__close'
								type='button'
								aria-label={t('close')}
								onClick={onClose}>
								<X aria-hidden='true' />
							</button>
						</header>

						<div className='quick-add-modal__body'>
							{loading && !detail && <LoadingState label={t('product.quickAddLoading')} />}
							{error && !detail && (
								<ErrorState message={error} onRetry={() => void loadProduct()} />
							)}
							{detail && (
								<ProductActions
									productId={detail.id}
									options={detail.options}
									showSuccessAlert={false}
									onSuccess={() => {
										setAdded(true)
										onClose()
									}}
								/>
							)}
						</div>
					</section>
				</div>,
				document.body
			)}
			{successAlert}
		</>
	)
}
