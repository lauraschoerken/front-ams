import './ProductActions.scss'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { ProductOption, ProductOptions } from '@/models/product'

interface ProductActionsProps {
	options: ProductOptions
	onAdd: (selection: { colorCode: number; storageCode: number }) => void
	disabled?: boolean
}

const getDefaultOption = (options: ProductOption[]) => options[0]?.code

export const ProductActions = ({ options, onAdd, disabled = false }: ProductActionsProps) => {
	const { t } = useTranslation()
	const [colorCode, setColorCode] = useState<number | undefined>(() => getDefaultOption(options.colors))
	const [storageCode, setStorageCode] = useState<number | undefined>(() =>
		getDefaultOption(options.storages)
	)

	useEffect(() => {
		setColorCode(getDefaultOption(options.colors))
		setStorageCode(getDefaultOption(options.storages))
	}, [options])

	const canAdd = colorCode !== undefined && storageCode !== undefined && !disabled

	return (
		<section className='product-actions' aria-labelledby='product-actions-title'>
			<h2 id='product-actions-title'>{t('product.actionsTitle')}</h2>

			<label className='product-actions__field'>
				<span>{t('product.storage')}</span>
				<select
					value={storageCode ?? ''}
					onChange={(event) => setStorageCode(Number(event.target.value))}
					disabled={options.storages.length <= 1 || disabled}>
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
					disabled={options.colors.length <= 1 || disabled}>
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
				onClick={() => {
					if (colorCode !== undefined && storageCode !== undefined) {
						onAdd({ colorCode, storageCode })
					}
				}}>
				{t('product.add')}
			</button>
		</section>
	)
}
