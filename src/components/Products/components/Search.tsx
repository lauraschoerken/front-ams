import './Search.scss'

import { useTranslation } from 'react-i18next'

interface SearchProps {
	value: string
	onChange: (value: string) => void
}

export const Search = ({ value, onChange }: SearchProps) => {
	const { t } = useTranslation()

	return (
		<div className='product-search'>
			<label className='product-search__label' htmlFor='product-search'>
				{t('productsPage.searchLabel')}
			</label>
			<input
				className='product-search__input'
				id='product-search'
				type='search'
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={t('productsPage.searchPlaceholder')}
			/>
		</div>
	)
}
