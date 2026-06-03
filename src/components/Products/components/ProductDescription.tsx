import './ProductDescription.scss'

import { useTranslation } from 'react-i18next'

import type { ProductDetail } from '@/models/product'

interface ProductDescriptionProps {
	product: ProductDetail
}

const normalizeValue = (value: string | string[] | number | undefined, unavailable: string) => {
	if (Array.isArray(value)) return value.filter(Boolean).join(', ')
	if (value === undefined || value === '') return unavailable
	return String(value)
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
	const { t } = useTranslation()
	const rows = [
		{ label: t('product.fields.brand'), value: product.brand },
		{ label: t('product.fields.model'), value: product.model },
		{ label: t('product.fields.price'), value: t('product.priceWithCurrency', { price: product.price }) },
		{ label: t('product.fields.cpu'), value: product.cpu },
		{ label: t('product.fields.ram'), value: product.ram },
		{ label: t('product.fields.os'), value: product.os },
		{ label: t('product.fields.displayResolution'), value: product.displayResolution },
		{ label: t('product.fields.battery'), value: product.battery },
		{ label: t('product.fields.primaryCamera'), value: product.primaryCamera },
		{ label: t('product.fields.secondaryCamera'), value: product.secondaryCamera ?? product.secondaryCmera },
		{ label: t('product.fields.dimensions'), value: product.dimensions ?? product.dimentions },
		{
			label: t('product.fields.weight'),
			value: product.weight ? t('product.weightWithUnit', { weight: product.weight }) : undefined,
		},
	]

	return (
		<section className='product-description' aria-labelledby='product-description-title'>
			<h2 id='product-description-title'>{t('product.descriptionTitle')}</h2>
			<dl className='product-description__list'>
				{rows.map((row) => (
					<div className='product-description__row' key={row.label}>
						<dt>{row.label}</dt>
						<dd>{normalizeValue(row.value, t('product.unavailable'))}</dd>
					</div>
				))}
			</dl>
		</section>
	)
}
