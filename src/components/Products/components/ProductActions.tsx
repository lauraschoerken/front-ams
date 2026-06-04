import './ProductActions.scss'

import { LoaderCircle, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCart } from '@/components/Cart/context/CartContext'
import { Alert } from '@/components/elements'
import type { ProductOption, ProductOptions } from '@/models/product'

interface ProductActionsProps {
	productId: string
	options: ProductOptions
	disabled?: boolean
	onSuccess?: () => void
	showSuccessAlert?: boolean
}

const getDefaultOption = (options: ProductOption[]) => options[0]?.code

export const ProductActions = ({
	productId,
	options,
	disabled = false,
	onSuccess,
	showSuccessAlert = true,
}: ProductActionsProps) => {
	const { t } = useTranslation()
	const { addItem } = useCart()
	const [colorCode, setColorCode] = useState<number | undefined>(() => getDefaultOption(options.colors))
	const [storageCode, setStorageCode] = useState<number | undefined>(() =>
		getDefaultOption(options.storages)
	)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		setColorCode(getDefaultOption(options.colors))
		setStorageCode(getDefaultOption(options.storages))
	}, [options])

	const canAdd = colorCode !== undefined && storageCode !== undefined && !disabled && !isSubmitting

	const handleAddToCart = async () => {
		if (colorCode === undefined || storageCode === undefined) return

		setIsSubmitting(true)
		setError(undefined)
		setSuccess(false)

		try {
			await addItem({ id: productId, colorCode, storageCode })
			setSuccess(showSuccessAlert)
			onSuccess?.()
		} catch (error) {
			setError(error instanceof Error ? error.message : t('cartAdd.error'))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<section className='product-actions' aria-labelledby='product-actions-title'>
				<div className='product-actions__options'>
					<h2 id='product-actions-title'>{t('product.actionsTitle')}</h2>

					<fieldset className='product-actions__field'>
						<legend>
							{t('product.storage')}:
							<strong>
								{options.storages.find((storage) => storage.code === storageCode)?.name}
							</strong>
						</legend>
						<div className='product-actions__choices'>
							{options.storages.map((storage) => (
								<button
									className='product-actions__choice'
									type='button'
									aria-pressed={storage.code === storageCode}
									disabled={disabled || isSubmitting}
									key={storage.code}
									onClick={() => setStorageCode(storage.code)}>
									{storage.name}
								</button>
							))}
						</div>
					</fieldset>

					<fieldset className='product-actions__field'>
						<legend>
							{t('product.color')}:
							<strong>{options.colors.find((color) => color.code === colorCode)?.name}</strong>
						</legend>
						<div className='product-actions__choices'>
							{options.colors.map((color) => (
								<button
									className='product-actions__choice'
									type='button'
									aria-pressed={color.code === colorCode}
									disabled={disabled || isSubmitting}
									key={color.code}
									onClick={() => setColorCode(color.code)}>
									{color.name}
								</button>
							))}
						</div>
					</fieldset>
				</div>

				<button
					className='product-actions__button'
					type='button'
					disabled={!canAdd}
					onClick={() => void handleAddToCart()}
					aria-label={isSubmitting ? t('product.adding') : t('product.add')}
					title={isSubmitting ? t('product.adding') : t('product.add')}>
					{isSubmitting ? (
						<LoaderCircle className='product-actions__button-icon product-actions__button-icon--loading' />
					) : (
						<ShoppingCart className='product-actions__button-icon' />
					)}
					<span>{isSubmitting ? t('product.adding') : t('product.add')}</span>
				</button>
			</section>

			{success && showSuccessAlert && (
				<Alert onClose={() => setSuccess(false)}>{t('cartAdd.success')}</Alert>
			)}
			{error && (
				<Alert variant='error' onClose={() => setError(undefined)}>
					{error}
				</Alert>
			)}
		</>
	)
}
