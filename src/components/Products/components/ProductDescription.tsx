import './ProductDescription.scss'

import { useState } from 'react'
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

const hasValue = (value: string | string[] | number | undefined) => {
	if (Array.isArray(value)) return value.some(Boolean)
	return value !== undefined && value !== ''
}

export const ProductDescription = ({ product }: ProductDescriptionProps) => {
	const { t } = useTranslation()
	const [expanded, setExpanded] = useState(false)
	const requiredRows = [
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
	const additionalRows = [
		{ label: t('product.fields.networkTechnology'), value: product.networkTechnology },
		{ label: t('product.fields.networkSpeed'), value: product.networkSpeed },
		{ label: t('product.fields.gprs'), value: product.gprs },
		{ label: t('product.fields.edge'), value: product.edge },
		{ label: t('product.fields.announced'), value: product.announced },
		{ label: t('product.fields.status'), value: product.status },
		{ label: t('product.fields.sim'), value: product.sim },
		{ label: t('product.fields.displayType'), value: product.displayType },
		{ label: t('product.fields.displaySize'), value: product.displaySize },
		{ label: t('product.fields.chipset'), value: product.chipset },
		{ label: t('product.fields.gpu'), value: product.gpu },
		{ label: t('product.fields.externalMemory'), value: product.externalMemory },
		{ label: t('product.fields.internalMemory'), value: product.internalMemory },
		{ label: t('product.fields.speaker'), value: product.speaker },
		{ label: t('product.fields.audioJack'), value: product.audioJack },
		{ label: t('product.fields.wlan'), value: product.wlan },
		{ label: t('product.fields.bluetooth'), value: product.bluetooth },
		{ label: t('product.fields.gps'), value: product.gps },
		{ label: t('product.fields.nfc'), value: product.nfc },
		{ label: t('product.fields.radio'), value: product.radio },
		{ label: t('product.fields.usb'), value: product.usb },
		{ label: t('product.fields.sensors'), value: product.sensors },
		{ label: t('product.fields.colors'), value: product.colors },
	].filter((row) => hasValue(row.value))

	const renderRows = (rows: typeof requiredRows) =>
		rows.map((row) => (
			<div className='product-description__row' key={row.label}>
				<dt>{row.label}</dt>
				<dd>{normalizeValue(row.value, t('product.unavailable'))}</dd>
			</div>
		))

	const expandButton = (
		<button
			className='product-description__expand'
			type='button'
			aria-expanded={expanded}
			aria-controls='additional-product-details'
			onClick={() => setExpanded((current) => !current)}>
			<span>
				{expanded
					? t('product.hideAdditionalDetails')
					: t('product.showAdditionalDetails', { count: additionalRows.length })}
			</span>
			<span className='product-description__expand-icon' aria-hidden='true' />
		</button>
	)

	return (
		<section className='product-description' aria-labelledby='product-description-title'>
			<h2 id='product-description-title'>{t('product.descriptionTitle')}</h2>
			<div className='product-description__table'>
				<dl className='product-description__list'>{renderRows(requiredRows)}</dl>

				{additionalRows.length > 0 && (
					<div
						className={`product-description__additional ${expanded ? 'product-description__additional--expanded' : ''}`}
						id='additional-product-details'
						aria-hidden={!expanded}>
					<dl
							className='product-description__list product-description__list--additional'>
						{renderRows(additionalRows)}
					</dl>
					</div>
				)}

				{additionalRows.length > 0 && expandButton}
			</div>
		</section>
	)
}
