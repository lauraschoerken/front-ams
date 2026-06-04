import './ProductActions.scss'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCart } from '@/components/Cart/context/CartContext'
import { Alert } from '@/components/elements'
import type { ProductOption, ProductOptions } from '@/models/product'

interface ProductActionsProps {
	productId: string
	options: ProductOptions
	disabled?: boolean
}

const getDefaultOption = (options: ProductOption[]) => options[0]?.code

export const ProductActions = ({
	productId,
	options,
	disabled = false,
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
			setSuccess(true)
		} catch (error) {
			setError(error instanceof Error ? error.message : t('cartAdd.error'))
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<section className='product-actions' aria-labelledby='product-actions-title'>
				<h2 id='product-actions-title'>{t('product.actionsTitle')}</h2>

				<label className='product-actions__field'>
					<span>{t('product.storage')}</span>
					<select
						value={storageCode ?? ''}
						onChange={(event) => setStorageCode(Number(event.target.value))}
						disabled={options.storages.length <= 1 || disabled || isSubmitting}>
						{options.storages.map((storage) => (
							<option key={storage.code} value={storage.code}>
								{storage.name}
							</option>
						))}
					</select>
				</label>

				<label className='product-actions__field'>
					<span>{t('product.color')}</span>
					<select
						value={colorCode ?? ''}
						onChange={(event) => setColorCode(Number(event.target.value))}
						disabled={options.colors.length <= 1 || disabled || isSubmitting}>
						{options.colors.map((color) => (
							<option key={color.code} value={color.code}>
								{color.name}
							</option>
						))}
					</select>
				</label>

				<button
					className='product-actions__button'
					type='button'
					disabled={!canAdd}
					onClick={() => void handleAddToCart()}>
					{isSubmitting ? t('product.adding') : t('product.add')}
				</button>
			</section>

			{success && <Alert onClose={() => setSuccess(false)}>{t('cartAdd.success')}</Alert>}
			{error && (
				<Alert variant='error' onClose={() => setError(undefined)}>
					{error}
				</Alert>
			)}
		</>
	)
}
